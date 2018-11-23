/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : bbs

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-11-23 21:10:59
*/

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS `bbs` CHARSET UTF8;

USE `bbs`;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `collect` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `forum_id` int(11) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`collect`),
  KEY `user_id` (`user_id`),
  KEY `forum_id` (`forum_id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('18', '33', '26', '2018-03-21 22:52:13');

-- ----------------------------
-- Table structure for end_opp
-- ----------------------------
DROP TABLE IF EXISTS `end_opp`;
CREATE TABLE `end_opp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `forum_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `end_opp_user_user_id_fk` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of end_opp
-- ----------------------------
INSERT INTO `end_opp` VALUES ('42', '1', '1', '1', '1', '2018-02-25 22:47:45');
INSERT INTO `end_opp` VALUES ('43', '1', '1', '2', '0', '2018-02-25 22:47:56');
INSERT INTO `end_opp` VALUES ('44', '33', '1', '2', '1', '2018-02-25 22:48:15');
INSERT INTO `end_opp` VALUES ('45', '1', '1', '4', '0', '2018-02-25 22:51:19');
INSERT INTO `end_opp` VALUES ('46', '1', '1', '10', '1', '2018-02-25 22:59:33');
INSERT INTO `end_opp` VALUES ('47', '1', '32', '32', '1', '2018-03-14 23:26:31');
INSERT INTO `end_opp` VALUES ('48', '42', '1', '25', '0', '2018-03-18 17:43:14');
INSERT INTO `end_opp` VALUES ('49', '42', '1', '25', '0', '2018-03-18 17:43:14');
INSERT INTO `end_opp` VALUES ('50', '42', '1', '48', '1', '2018-03-20 21:55:13');

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `follow_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `follow_user_id` int(11) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follow_id`),
  KEY `follow_user_id` (`follow_user_id`),
  KEY `user_id_key` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES ('38', '1', '33', '2018-03-20 22:58:35');
INSERT INTO `follow` VALUES ('40', '35', '33', '2018-03-20 22:58:35');
INSERT INTO `follow` VALUES ('46', '42', '33', '2018-03-20 22:58:35');
INSERT INTO `follow` VALUES ('55', '33', '31', '2018-03-20 22:58:35');
INSERT INTO `follow` VALUES ('44', '30', '33', '2018-03-20 22:58:35');
INSERT INTO `follow` VALUES ('45', '31', '33', '2018-03-20 22:58:35');
INSERT INTO `follow` VALUES ('96', '33', '42', '2018-03-20 22:58:35');

-- ----------------------------
-- Table structure for forum
-- ----------------------------
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `forum_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL COMMENT '游戏ID',
  `user_id` int(11) NOT NULL COMMENT '发表人的id',
  `title` varchar(30) NOT NULL COMMENT '标题',
  `forum_content` text NOT NULL COMMENT '内容',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `replay` int(11) NOT NULL DEFAULT '0' COMMENT '阅读数',
  `comment` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `end` int(11) NOT NULL DEFAULT '0' COMMENT '赞同',
  `opp` int(11) NOT NULL DEFAULT '0' COMMENT '反对',
  `overhead` int(11) NOT NULL DEFAULT '0' COMMENT '顶置',
  `collect` int(11) DEFAULT NULL,
  PRIMARY KEY (`forum_id`),
  KEY `forum_game_game_id_fk` (`game_id`),
  KEY `forum_user_user_id_fk` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of forum
-- ----------------------------
INSERT INTO `forum` VALUES ('25', '1', '42', 'wonder', '<p>wonder<br></p>', '2018-03-07 22:20:37', '11', '26', '0', '2', '0', '0');
INSERT INTO `forum` VALUES ('26', '1', '42', ' 蔡钦江', '<p>蔡钦江<br></p>', '2018-03-07 22:20:44', '3', '0', '0', '0', '0', '1');
INSERT INTO `forum` VALUES ('27', '1', '42', ' 19970703', '<p>19970703<br></p>', '2018-03-07 22:20:55', '2', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('28', '1', '42', ' 蔡大胖', '<p>蔡大胖<br></p>', '2018-03-07 22:21:11', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('29', '1', '42', 'asdfqwerasdf', '<p>asdfqwerasdf</p>', '2018-03-08 21:25:56', '4', '1', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('30', '1', '42', ' 钦江', '<p> 钦江</p>', '2018-03-08 21:26:12', '1', '0', '0', '0', '0', '1');
INSERT INTO `forum` VALUES ('31', '27', '42', 'wibder', 'wonder<p><br></p>', '2018-03-08 22:01:11', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('32', '38', '42', 'wonder', '<p>蔡钦江<br></p>', '2018-03-09 23:33:28', '0', '0', '1', '0', '0', '0');
INSERT INTO `forum` VALUES ('33', '38', '42', ' wonder', '<p>钦江<br></p>', '2018-03-09 23:33:40', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('34', '38', '42', '蔡钦江2', '<p>wonder<br></p>', '2018-03-09 23:34:40', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('35', '1', '42', 'w', '<p>w<br></p>', '2018-03-11 16:07:09', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('38', '38', '42', 'w', '<p>蔡钦江蔡钦江蔡钦江蔡钦江蔡钦江蔡钦江</p><p>蔡钦江蔡钦江蔡钦江蔡钦江<br></p>', '2018-03-11 16:42:43', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('37', '1', '42', ' wonder', '<p>wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww<br></p>', '2018-03-11 16:40:15', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('39', '1', '42', 'wonder', '<p>wonder</p>', '2018-03-11 16:50:28', '3', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('40', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:50:35', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('41', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:50:40', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('42', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:50:46', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('43', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:50:51', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('44', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:50:56', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('45', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:51:01', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('46', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:51:07', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('47', '1', '42', ' wonder', '<p>wonder</p>', '2018-03-11 16:51:13', '0', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('48', '1', '33', 'wonder', 'wonder<p><br></p>', '2018-03-18 16:47:15', '3', '0', '1', '0', '0', '0');
INSERT INTO `forum` VALUES ('49', '1', '33', ' wonder', 'wonder.123<p><br></p>', '2018-03-18 16:47:22', '4', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('50', '1', '42', ' wonder', 'wonder<p><br></p>', '2018-03-18 16:47:56', '1', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('51', '1', '42', ' wonder', '<p> wonder</p>', '2018-03-18 16:49:02', '1', '0', '0', '0', '0', '0');
INSERT INTO `forum` VALUES ('54', '30', '42', 'wonder', '<p>wonder</p>', '2018-05-13 17:59:41', '0', '0', '0', '0', '0', null);
INSERT INTO `forum` VALUES ('53', '30', '42', 'wonder', '<p>wonder</p>', '2018-05-13 17:59:34', '0', '0', '0', '0', '0', null);
INSERT INTO `forum` VALUES ('52', '1', '42', 'wonder123', '<p>wonder</p>', '2018-05-13 17:49:08', '1', '1', '0', '0', '0', null);

-- ----------------------------
-- Table structure for forum_big_com
-- ----------------------------
DROP TABLE IF EXISTS `forum_big_com`;
CREATE TABLE `forum_big_com` (
  `big_com_id` int(11) NOT NULL AUTO_INCREMENT,
  `forum_id` int(11) NOT NULL COMMENT '帖子ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `game_id` int(11) DEFAULT NULL,
  `text` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `position` int(11) NOT NULL COMMENT '位置',
  PRIMARY KEY (`big_com_id`),
  KEY `forum_big_com_user_user_id_fk` (`user_id`),
  KEY `forum_big_com_forum_forum_id_fk` (`forum_id`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of forum_big_com
-- ----------------------------
INSERT INTO `forum_big_com` VALUES ('28', '29', '42', '1', '<p>输入大于五个字的评论!!!!</p><p><br></p>', '2018-03-08 22:09:14', '2');
INSERT INTO `forum_big_com` VALUES ('29', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:29', '2');
INSERT INTO `forum_big_com` VALUES ('30', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:33', '3');
INSERT INTO `forum_big_com` VALUES ('31', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:33', '4');
INSERT INTO `forum_big_com` VALUES ('32', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:37', '5');
INSERT INTO `forum_big_com` VALUES ('33', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:37', '6');
INSERT INTO `forum_big_com` VALUES ('34', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:38', '7');
INSERT INTO `forum_big_com` VALUES ('35', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:42', '8');
INSERT INTO `forum_big_com` VALUES ('36', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:46', '9');
INSERT INTO `forum_big_com` VALUES ('37', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:47', '10');
INSERT INTO `forum_big_com` VALUES ('38', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:47', '11');
INSERT INTO `forum_big_com` VALUES ('39', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:51', '12');
INSERT INTO `forum_big_com` VALUES ('40', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:40:51', '13');
INSERT INTO `forum_big_com` VALUES ('41', '25', '42', '1', '<p>输入大于五个字的评论！！！！</p><p><br></p>', '2018-03-11 22:41:07', '14');
INSERT INTO `forum_big_com` VALUES ('42', '25', '42', '1', '<p>输入大于五个字的评论！！！！</p><p><br></p>', '2018-03-11 22:41:07', '15');
INSERT INTO `forum_big_com` VALUES ('43', '25', '42', '1', '<p>输入大于五个字的评论！！！！</p><p><br></p>', '2018-03-11 22:41:07', '16');
INSERT INTO `forum_big_com` VALUES ('44', '25', '42', '1', '<p>输入大于五个字的评论！！！！！</p><p><br></p>', '2018-03-11 22:43:25', '17');
INSERT INTO `forum_big_com` VALUES ('45', '25', '42', '1', '<p>输入大于五个字的评论！！！！</p><p><br></p>', '2018-03-11 22:43:35', '18');
INSERT INTO `forum_big_com` VALUES ('46', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:42', '19');
INSERT INTO `forum_big_com` VALUES ('47', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:42', '20');
INSERT INTO `forum_big_com` VALUES ('48', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:43', '21');
INSERT INTO `forum_big_com` VALUES ('49', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:43', '22');
INSERT INTO `forum_big_com` VALUES ('50', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:43', '23');
INSERT INTO `forum_big_com` VALUES ('51', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:43', '24');
INSERT INTO `forum_big_com` VALUES ('52', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:43', '25');
INSERT INTO `forum_big_com` VALUES ('53', '25', '42', '1', '<p>输入大于五个字的评论！！！</p><p><br></p>', '2018-03-11 22:43:51', '26');
INSERT INTO `forum_big_com` VALUES ('54', '25', '42', '1', '<p>输入大于五个字的评论！！！！！</p><p><br></p>', '2018-03-11 22:44:33', '27');
INSERT INTO `forum_big_com` VALUES ('55', '52', '42', '1', '<p>输入大于五个字的评论!!!</p><p><br></p>', '2018-05-13 17:49:17', '2');

-- ----------------------------
-- Table structure for forum_small_com
-- ----------------------------
DROP TABLE IF EXISTS `forum_small_com`;
CREATE TABLE `forum_small_com` (
  `sma_com_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '小评论的ID',
  `big_id` int(11) NOT NULL COMMENT '大评论ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `text` text NOT NULL COMMENT '文本',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sma_com_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of forum_small_com
-- ----------------------------
INSERT INTO `forum_small_com` VALUES ('7', '55', '42', '好', '2018-05-13 17:49:26');

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_name` varchar(30) NOT NULL COMMENT '游戏名英文，为了找对应的数据库',
  `game_name_cn` varchar(30) NOT NULL COMMENT '游戏中文',
  `game_img` varchar(30) NOT NULL COMMENT '游戏图片',
  `game_type` varchar(20) NOT NULL COMMENT '游戏类型',
  `game_description` varchar(40) NOT NULL COMMENT '描述',
  `forum_count` int(11) NOT NULL DEFAULT '0' COMMENT '帖子数',
  `sign_in` int(11) NOT NULL DEFAULT '0' COMMENT '签到',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  UNIQUE KEY `game_game_name_uindex` (`game_name`),
  KEY `game_user_user_id_fk` (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of game
-- ----------------------------
INSERT INTO `game` VALUES ('1', 'astroneer', '异星探险家', 'avatar.gif', '沙盒', '一个好玩的游戏', '28', '5', '2017-12-22 15:54:06', '32');
INSERT INTO `game` VALUES ('4', 'astroneer1', '异星探险家2', 'avatar.gif', '沙盒', '一个好玩的游戏', '1', '4', '2017-12-22 22:49:14', '31');
INSERT INTO `game` VALUES ('27', 'forza7', '极限竞速7', 'forza7.jpg', '竞速赛车类', '', '2', '2', '2018-01-03 10:12:39', null);
INSERT INTO `game` VALUES ('21', 'ASDF', 'ASDF', 'ASDF.jpg', 'ASDF', 'ASDF', '0', '0', '2018-01-03 00:25:09', null);
INSERT INTO `game` VALUES ('23', 'Diablo3', '暗黑破坏神3', 'Diablo3.jpg', '角色扮演类', '', '0', '0', '2018-01-03 10:09:18', null);
INSERT INTO `game` VALUES ('24', 'dead_cells', '死亡细胞', 'dead_cells.jpg', '独立游戏类', '', '0', '0', '2018-01-03 10:09:58', null);
INSERT INTO `game` VALUES ('25', 'dirt4', '尘埃4', 'dirt4.jpg', '竞速赛车类', '', '0', '0', '2018-01-03 10:11:20', null);
INSERT INTO `game` VALUES ('26', 'forza_horizon3', '极限竞速地平线3', 'forza_horizon3.jpg', '竞速赛车类', '', '0', '0', '2018-01-03 10:12:15', null);
INSERT INTO `game` VALUES ('28', 'GT_sport', 'GT赛车', 'GT_sport.jpg', '竞速赛车类', '', '0', '0', '2018-01-03 10:13:13', null);
INSERT INTO `game` VALUES ('29', 'hollow_knight', '空洞骑士', 'hollow_knight.jpg', '独立游戏类', '', '0', '0', '2018-01-03 10:13:42', null);
INSERT INTO `game` VALUES ('30', 'inside', '囚禁', 'inside.jpg', '独立游戏类', '', '2', '1', '2018-01-03 10:14:21', null);
INSERT INTO `game` VALUES ('31', 'limbo', '地狱边缘', 'limbo.jpg', '独立游戏类', '', '0', '0', '2018-01-03 10:14:54', null);
INSERT INTO `game` VALUES ('32', 'nfs_payback', '极品飞车20', 'nfs_payback.jpg', '竞速赛车类', '', '0', '0', '2018-01-03 10:16:06', null);
INSERT INTO `game` VALUES ('33', 'Persona_5', '女神异闻录5', 'Persona_5.jpg', '角色扮演类', '', '0', '0', '2018-01-03 10:16:45', null);
INSERT INTO `game` VALUES ('34', 'project_cars2', '赛车计划2', 'project_cars2.jpg', '竞速赛车类', '', '0', '0', '2018-01-03 10:17:10', null);
INSERT INTO `game` VALUES ('35', 'Salt_and_Sanctuary', '盐和避难所', 'Salt_and_Sanctuary.jpg', '独立游戏类', '', '0', '0', '2018-01-03 10:17:53', null);
INSERT INTO `game` VALUES ('36', 'Xenoblade_2', '异度之刃2', 'Xenoblade_2.jpg', '角色扮演类', '', '0', '0', '2018-01-03 10:18:25', null);
INSERT INTO `game` VALUES ('37', 'Dark_Souls_3', '黑暗之魂3', 'Dark_Souls_3.jpg', '角色扮演类', '', '0', '0', '2018-01-03 10:20:06', null);
INSERT INTO `game` VALUES ('38', 'fifa18', 'FIFA18', 'fifa18.jpg', '竞速赛车类', '', '4', '0', '2018-01-03 10:58:25', '30');
INSERT INTO `game` VALUES ('39', 'zelda', '塞尔达传说', 'zelda.jpg', '角色扮演类', '', '1', '1', '2017-12-26 12:50:42', null);

-- ----------------------------
-- Table structure for like
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `cookie_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of like
-- ----------------------------
INSERT INTO `like` VALUES ('1', '33', '1', '2018-01-01 18:12:42');
INSERT INTO `like` VALUES ('2', '1', '0', '2018-01-01 18:13:29');
INSERT INTO `like` VALUES ('3', '1', '33', '2018-01-01 18:15:24');
INSERT INTO `like` VALUES ('4', '1', '30', '2018-01-01 22:28:13');
INSERT INTO `like` VALUES ('5', '1', '33', '2018-02-28 22:45:13');
INSERT INTO `like` VALUES ('6', '1', '33', '2018-02-28 22:45:16');
INSERT INTO `like` VALUES ('7', '1', '33', '2018-02-28 22:45:20');
INSERT INTO `like` VALUES ('8', '1', '33', '2018-02-28 22:45:22');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `cookie_id` int(11) NOT NULL,
  `message_content` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`msg_id`),
  KEY `message_user_user_id_fk` (`cookie_id`)
) ENGINE=MyISAM AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', '1', '1', '你好帅呀', '2018-01-01 15:19:42');
INSERT INTO `message` VALUES ('2', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('3', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('4', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('5', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('6', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('7', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('8', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('9', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('10', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('11', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('12', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('13', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('14', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('15', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('16', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('17', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('18', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('19', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('20', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('21', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('22', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('23', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('24', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('25', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('26', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('27', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('28', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('29', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('30', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('31', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('32', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('33', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('34', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('35', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('36', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('37', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('38', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('39', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('40', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('41', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('42', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('43', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('44', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('45', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('46', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('47', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('48', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('49', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('50', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('51', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('52', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('53', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('54', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('55', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('56', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('57', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('58', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('59', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('60', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('61', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('62', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('63', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('64', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('65', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('66', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('67', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('68', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('69', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('70', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('71', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('72', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('73', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('74', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('75', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('76', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('77', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('78', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('79', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('80', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('81', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('82', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('83', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('84', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('85', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('86', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('87', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('88', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('89', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('90', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('91', '1', '1', '你好帅', '2018-01-01 15:20:34');
INSERT INTO `message` VALUES ('92', '1', '1', '', '2018-01-01 16:11:22');
INSERT INTO `message` VALUES ('93', '1', '1', '我好帅呀！！！！', '2018-01-01 16:11:57');
INSERT INTO `message` VALUES ('94', '1', '1', '我好帅呀', '2018-01-01 16:13:22');
INSERT INTO `message` VALUES ('95', '1', '33', '笑话，我才是最帅的！！！', '2018-01-01 16:17:28');
INSERT INTO `message` VALUES ('96', '33', '33', '自己对自己留言！！！', '2018-01-01 16:38:40');
INSERT INTO `message` VALUES ('97', '1', '1', '1', '2018-01-03 22:33:23');
INSERT INTO `message` VALUES ('98', '1', '1', '2', '2018-01-03 22:33:26');
INSERT INTO `message` VALUES ('99', '1', '1', '3', '2018-01-03 22:33:29');
INSERT INTO `message` VALUES ('100', '1', '1', '4', '2018-01-03 22:33:32');
INSERT INTO `message` VALUES ('101', '1', '1', '5', '2018-01-03 22:33:34');
INSERT INTO `message` VALUES ('102', '1', '1', '6', '2018-01-03 22:33:37');
INSERT INTO `message` VALUES ('103', '1', '1', '7', '2018-01-03 22:33:40');
INSERT INTO `message` VALUES ('104', '1', '1', '8', '2018-01-03 22:33:43');
INSERT INTO `message` VALUES ('105', '1', '1', '9', '2018-01-03 22:33:47');
INSERT INTO `message` VALUES ('106', '1', '1', '10', '2018-01-03 22:33:50');
INSERT INTO `message` VALUES ('107', '1', '1', '11', '2018-01-03 22:33:52');
INSERT INTO `message` VALUES ('108', '1', '1', '12', '2018-01-03 22:33:57');
INSERT INTO `message` VALUES ('109', '1', '1', '13', '2018-01-03 22:34:00');
INSERT INTO `message` VALUES ('110', '1', '1', '14', '2018-01-03 22:34:04');
INSERT INTO `message` VALUES ('111', '1', '1', '15', '2018-01-03 22:34:07');
INSERT INTO `message` VALUES ('112', '1', '1', '16', '2018-01-03 22:34:10');
INSERT INTO `message` VALUES ('113', '1', '1', '17', '2018-01-03 22:34:13');
INSERT INTO `message` VALUES ('114', '1', '1', '19', '2018-01-03 22:34:16');
INSERT INTO `message` VALUES ('115', '1', '1', '20', '2018-01-03 22:34:19');
INSERT INTO `message` VALUES ('116', '1', '1', '21', '2018-01-03 22:34:21');
INSERT INTO `message` VALUES ('117', '32', '32', '我要留言', '2018-02-28 22:36:17');

-- ----------------------------
-- Table structure for ready_table
-- ----------------------------
DROP TABLE IF EXISTS `ready_table`;
CREATE TABLE `ready_table` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT '发表人的id',
  `title` varchar(30) NOT NULL COMMENT '标题',
  `forum_content` text NOT NULL COMMENT '内容',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `replay` int(11) NOT NULL DEFAULT '0' COMMENT '阅读数',
  `comment` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `end` int(11) NOT NULL DEFAULT '0' COMMENT '赞同',
  `opp` int(11) NOT NULL DEFAULT '0' COMMENT '反对',
  `overhead` int(11) NOT NULL DEFAULT '0' COMMENT '顶置',
  `game_id` int(11) NOT NULL,
  KEY `ready_table_game_game_id_fk` (`game_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ready_table
-- ----------------------------

-- ----------------------------
-- Table structure for sign_in
-- ----------------------------
DROP TABLE IF EXISTS `sign_in`;
CREATE TABLE `sign_in` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sign_in_user_user_id_fk` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign_in
-- ----------------------------
INSERT INTO `sign_in` VALUES ('31', '1', '4', '2018-02-04 22:54:22');
INSERT INTO `sign_in` VALUES ('32', '1', '1', '2018-02-04 22:55:01');
INSERT INTO `sign_in` VALUES ('33', '1', '27', '2018-02-04 22:55:10');
INSERT INTO `sign_in` VALUES ('34', '1', '1', '2018-02-25 21:45:41');
INSERT INTO `sign_in` VALUES ('35', '1', '27', '2018-02-25 22:11:50');
INSERT INTO `sign_in` VALUES ('36', '1', '4', '2018-02-25 22:14:54');
INSERT INTO `sign_in` VALUES ('37', '1', '4', '2018-02-28 22:25:03');
INSERT INTO `sign_in` VALUES ('38', '1', '39', '2018-02-28 22:55:43');
INSERT INTO `sign_in` VALUES ('39', '33', '1', '2018-03-12 22:26:28');
INSERT INTO `sign_in` VALUES ('40', '33', '1', '2018-03-18 16:47:07');
INSERT INTO `sign_in` VALUES ('41', '42', '1', '2018-03-18 16:47:42');
INSERT INTO `sign_in` VALUES ('42', '42', '30', '2018-05-13 17:59:27');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  `nickname` varchar(30) DEFAULT NULL,
  `sex` varchar(10) NOT NULL DEFAULT '男' COMMENT '性别',
  `email` varchar(50) NOT NULL COMMENT '电子邮箱',
  `phone` varchar(15) NOT NULL COMMENT '手机号码',
  `type` varchar(20) NOT NULL DEFAULT '普通用户' COMMENT '用户类型',
  `birth_date` varchar(30) DEFAULT NULL COMMENT '出生日期',
  `age` varchar(10) DEFAULT '0' COMMENT '年龄',
  `address` text COMMENT '地址',
  `top_img` varchar(50) NOT NULL DEFAULT 'avatar.gif',
  `exp` int(11) DEFAULT '0' COMMENT '经验值',
  `description` text COMMENT '描述',
  `privacy` varchar(50) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `login_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `visit` int(11) NOT NULL DEFAULT '0',
  `like` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('42', 'wonder', 'cc2c4b20afee0fcb10c34c328f78b995', '帅哥胖', '男', 'wonder@qq.con', '11111111111', '超级管理员', 'null', '20', 'null', 'avatar.gif', '108', '我这个人很懒什么都没留下......', 'age,birth_date,email,phone,address', '2018-03-18 00:33:05', '2018-05-13 00:00:00', '27', '0');
INSERT INTO `user` VALUES ('30', 'wonder2', 'cc2c4b20afee0fcb10c34c328f78b995', 'wonder2', '男', '123@163.com', '12333333333', '管理员', null, '0', null, 'avatar.gif', '56', '我这个人很懒什么都没留下......', null, '2017-12-26 22:05:21', '2018-03-17 00:00:00', '18', '0');
INSERT INTO `user` VALUES ('31', 'wonder3', 'cc2c4b20afee0fcb10c34c328f78b995', 'wonder3', '男', '1491733348@qq.com', '13128348692', '管理员', null, '0', null, 'avatar.gif', '30', '我这个人很懒什么都没留下......', null, '2017-12-26 22:06:03', '2018-03-17 00:00:00', '8', '0');
INSERT INTO `user` VALUES ('32', 'wonder10', 'cc2c4b20afee0fcb10c34c328f78b995', 'wonder10', '男', 'wonder123@sohu.com', '12345678901', '管理员', null, '0', null, 'avatar.gif', '10', '我这个人很懒什么都没留下......', null, '2017-12-27 00:31:12', '2017-12-29 17:31:17', '15', '17');
INSERT INTO `user` VALUES ('33', 'wonder33', 'cc2c4b20afee0fcb10c34c328f78b995', 'wonder33', '男', 'wonder1236@163.com', '12345555555', '普通用户', 'null', '18', 'null', '33_avatar.jpg', '495', '我这个人很懒什么都没留下......', null, '2017-12-27 22:51:59', '2018-03-21 00:00:00', '29', '13');
INSERT INTO `user` VALUES ('35', 'wonder123', 'cc2c4b20afee0fcb10c34c328f78b995', 'wonder123', '男', 'wonder123123@yahoo.com', '13122222222', '普通用户', null, '0', null, 'avatar.gif', '10', '我这个人很懒什么都没留下......', null, '2017-12-27 22:59:14', '2017-12-29 17:31:17', '2', '0');
