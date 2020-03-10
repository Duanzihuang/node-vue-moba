const mongoose = require('mongoose')

const HeroSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  title: String,
  categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number }, // 难度
    skills: { type: Number }, // 技能
    attack: { type: Number }, // 攻击
    survive: { type: Number } // 生存
  },
  skills: [
    {
      icon: String,
      name: String,
      description: String,
      tips: String
    }
  ],
  item1: [{ type: mongoose.Types.ObjectId, ref: 'Item' }], // 顺风出装
  item2: [{ type: mongoose.Types.ObjectId, ref: 'Item' }], // 逆风出装
  usageTips: String, // 使用技巧
  battleTips: String, // 对抗技巧
  teamTips: String, // 团队思路
  partners: [
    // 英雄关系
    {
      hero: { type: mongoose.Types.ObjectId, ref: 'Hero' },
      description: String
    }
  ]
})

module.exports = mongoose.model('Hero', HeroSchema)
