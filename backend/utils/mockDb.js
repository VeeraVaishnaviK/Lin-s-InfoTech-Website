const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Seed mock data
const mockDb = {
  User: [
    {
      _id: new mongoose.Types.ObjectId('60d5ec38ec9e2c2168817a11'),
      name: 'Rejolin Solomon J',
      email: 'admin@linsinfotech.com',
      password: '', // Will hash this on init
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  Blog: [
    {
      _id: new mongoose.Types.ObjectId('60d5ec38ec9e2c2168817a12'),
      title: 'The Future of AI in Modern Business',
      slug: 'future-of-ai',
      content: 'Exploring how Artificial Intelligence is transforming modern workflows. AI is no longer just a buzzword; it is a fundamental shift in how we operate, innovate, and grow.',
      excerpt: 'AI is no longer just a buzzword; it is a fundamental shift in how we operate.',
      author: new mongoose.Types.ObjectId('60d5ec38ec9e2c2168817a11'),
      status: 'published',
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId('60d5ec38ec9e2c2168817a13'),
      title: 'Automating Your Creative Process',
      slug: 'automating-creativity',
      content: 'How generative AI is helping creators, designers, and writers overcome writer block, scale production, and stay inspired while maintaining their unique human touch.',
      excerpt: 'Generative AI is a co-pilot for the modern creative professional.',
      author: new mongoose.Types.ObjectId('60d5ec38ec9e2c2168817a11'),
      status: 'published',
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  Project: [
    {
      _id: new mongoose.Types.ObjectId('60d5ec38ec9e2c2168817a14'),
      title: 'AI Customer Service Engine',
      description: 'An advanced conversational agent powered by Gemini to handle enterprise support.',
      status: 'completed',
      client: 'Lin Tech Labs',
      value: 12000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  Lead: [],
  Invoice: [],
  Consultation: []
};

// Hash admin password so standard login works!
(async () => {
  mockDb.User[0].password = await bcrypt.hash('password123', 12);
})();

// Helper to match filter criteria
function matchesQuery(item, filter) {
  if (!filter || Object.keys(filter).length === 0) return true;
  for (const key in filter) {
    const val = filter[key];
    if (key === '$or' && Array.isArray(val)) {
      return val.some(f => matchesQuery(item, f));
    }
    // Standard direct key comparison
    if (item[key] === undefined) {
      // Could be nested or missing path
      continue;
    }
    if (val && typeof val === 'object' && !(val instanceof mongoose.Types.ObjectId) && !(val instanceof RegExp)) {
      // simple mongo operator like $ne, $in, $gt, $lt
      if (val.$ne !== undefined && String(item[key]) === String(val.$ne)) return false;
      if (val.$in !== undefined && Array.isArray(val.$in) && !val.$in.map(String).includes(String(item[key]))) return false;
      continue;
    }
    if (val instanceof RegExp) {
      if (!val.test(item[key])) return false;
    } else if (String(item[key]) !== String(val)) {
      return false;
    }
  }
  return true;
}

// Override Query.prototype.exec
const originalExec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = async function() {
  // Only intercept if database is NOT connected (readyState !== 1)
  if (mongoose.connection.readyState !== 1) {
    const modelName = this.model.modelName;
    const op = this.op;
    const filter = this._conditions || {};
    const updateData = this._update || {};
    
    console.log(`[MOCK DB] Intercepted Query: ${modelName}.${op} with filter:`, JSON.stringify(filter));

    if (!mockDb[modelName]) {
      mockDb[modelName] = [];
    }

    const list = mockDb[modelName];

    let result;
    if (op === 'find') {
      const matched = list.filter(item => matchesQuery(item, filter));
      result = matched.map(item => this.model.hydrate(item));
    } else if (op === 'findOne' || op === 'findById') {
      const matched = list.find(item => matchesQuery(item, filter));
      result = matched ? this.model.hydrate(matched) : null;
    } else if (op === 'count' || op === 'countDocuments') {
      result = list.filter(item => matchesQuery(item, filter)).length;
    } else if (op === 'findOneAndUpdate' || op === 'findByIdAndUpdate' || op === 'updateOne') {
      const matchedIdx = list.findIndex(item => matchesQuery(item, filter));
      if (matchedIdx !== -1) {
        const item = list[matchedIdx];
        const updatedItem = { ...item, ...updateData, updatedAt: new Date() };
        if (updateData.$set) {
          Object.assign(updatedItem, updateData.$set);
        }
        list[matchedIdx] = updatedItem;
        result = this.model.hydrate(updatedItem);
      } else {
        result = null;
      }
    } else if (op === 'deleteOne' || op === 'deleteMany') {
      const initialLen = list.length;
      mockDb[modelName] = list.filter(item => !matchesQuery(item, filter));
      result = { deletedCount: initialLen - mockDb[modelName].length };
    } else {
      // Fallback
      result = null;
    }

    return result;
  }

  return originalExec.apply(this, arguments);
};

// Override Model.prototype.save
const originalSave = mongoose.Model.prototype.save;
mongoose.Model.prototype.save = async function() {
  if (mongoose.connection.readyState !== 1) {
    const modelName = this.constructor.modelName;
    console.log(`[MOCK DB] Intercepted Save: ${modelName}`);

    if (!mockDb[modelName]) {
      mockDb[modelName] = [];
    }

    const list = mockDb[modelName];
    const docObj = this.toObject();

    // Check if it already exists to do update, else insert
    const matchedIdx = list.findIndex(item => String(item._id) === String(docObj._id));
    if (matchedIdx !== -1) {
      list[matchedIdx] = { ...list[matchedIdx], ...docObj, updatedAt: new Date() };
    } else {
      if (!docObj._id) {
        docObj._id = new mongoose.Types.ObjectId();
      }
      docObj.createdAt = docObj.createdAt || new Date();
      docObj.updatedAt = new Date();
      list.push(docObj);
    }

    // Mark as not new
    this.isNew = false;
    return this;
  }

  return originalSave.apply(this, arguments);
};

console.log('--- [MOCK DB] Intelligent Database Mock Layer Loaded successfully ---');
