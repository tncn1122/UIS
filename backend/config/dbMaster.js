import sequelize from 'sequelize'
import pg from 'pg'
const { config } = require('./loadConfig');
import { DATABASE_FOREIGN_KEY } from '../config'

import UserSchema from '../service/user/schemaUser'
import UserProfileSchema from '../service/user/schemaUserProfile'
import UserEducationSchema from '../service/user/schemaUserEducation'
import UserWorkExperienceSchema from '../service/user/schemaUserWorkExperience'
import TeamSchema from '../service/team/schema'
import TeamUserSchema from '../service/team_user/schema'
import NewsSchema from '../service/news/schema'
import NewsLikeSchema from '../service/news/likes/schema'
import NewsCommentSchema from '../service/news/comments/schema'
import NewsCommentLikeSchema from '../service/news/comments/likes/schema'
import NewsViewSchema from '../service/news/views/schema'

import ForumSchema from '../service/forum/schema'
import ForumCategorySchema from '../service/forum/category/schema'
import ForumTopicSchema from '../service/forum/topic/schema'
import ForumPostSchema from '../service/forum/post/schema'
import ForumPostLikeDislikeSchema from '../service/forum/post/likeDislike/schema'
import ForumTopicViewSchema from '../service/forum/topic/view/schema'

import FaqSchema from '../service/faq/schemaFaq'
import ContestSchema from '../service/contest/schema'
import ContestCalendarSchema from '../service/contestCalendar/schema'


pg.defaults.parseInt8 = true;
const connection = new sequelize(config.get('database.master'));

//models
const User = UserSchema(connection)
const UserProfile = UserProfileSchema(connection)
const UserEducation = UserEducationSchema(connection)
const UserWorkExperience = UserWorkExperienceSchema(connection)
const Team = TeamSchema(connection)
const TeamUser = TeamUserSchema(connection)
const News = NewsSchema(connection)
const NewsLike = NewsLikeSchema(connection)
const NewsComment = NewsCommentSchema(connection)
const NewsCommentLike = NewsCommentLikeSchema(connection)
const NewsView = NewsViewSchema(connection)

const Forum = ForumSchema(connection)
const ForumCategory = ForumCategorySchema(connection)
const ForumTopic = ForumTopicSchema(connection)
const ForumPost = ForumPostSchema(connection)
const ForumPostLikeDislike = ForumPostLikeDislikeSchema(connection)
const ForumTopicView = ForumTopicViewSchema(connection)

const Faq = FaqSchema(connection)

const Contest = ContestSchema(connection)
const ContestCalendar = ContestCalendarSchema(connection)

/** +++++ -------------- Association: Begin -------------- +++++ */
const userForeignKey = {
  name: DATABASE_FOREIGN_KEY.USER_ID,
  allowNull: false
}

const newsForeignKey = {
  name: DATABASE_FOREIGN_KEY.NEWS_ID,
  allowNull: false
}

const newsCommentForeignKey = {
  name: DATABASE_FOREIGN_KEY.NEWS_COMMENT_ID,
  allowNull: true
}

const newsCommentParentForeignKey = {
  name: DATABASE_FOREIGN_KEY.NEWS_COMMENT_PARENT_ID,
  allowNull: true
}

const forumCategoryForeignKey = {
  name: DATABASE_FOREIGN_KEY.FORUM_CATEGORY_ID,
  allowNull: true
}

const forumForeignKey = {
  name: DATABASE_FOREIGN_KEY.FORUM_ID,
  allowNull: true
}

const forumTopicForeignKey = {
  name: DATABASE_FOREIGN_KEY.FORUM_TOPIC_ID,
  allowNull: true
}

const forumPostForeignKey = {
  name: DATABASE_FOREIGN_KEY.FORUM_POST_ID,
  allowNull: true
}

const forumParentPostForeignKey = {
  name: DATABASE_FOREIGN_KEY.FORUM_PARENT_POST_ID,
  allowNull: true
}

const createdByForeignKey = {
  name: DATABASE_FOREIGN_KEY.CREATED_BY,
  allowNull: false
}

const contestForeignKey = {
  name: DATABASE_FOREIGN_KEY.CONTEST_ID,
  allowNull: true
}

/** -------------- User Information: Begin -------------- */
User.hasOne(UserProfile, {
  foreignKey: userForeignKey,
  as: 'userProfile'
})

UserProfile.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

User.hasMany(UserEducation, {
  foreignKey: userForeignKey,
  as: "userEducations"
})
UserEducation.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

User.hasMany(UserWorkExperience, {
  foreignKey: userForeignKey,
  as: "userWorkExperiences"
})
UserWorkExperience.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})
/** -------------- User Information: End -------------- */

/** -------------- Team: Begin -------------- */
User.belongsToMany(Team, {
  through: TeamUser,
  foreignKey: 'userId',
  otherKey: 'teamId',
  as: 'teams'
})

Team.belongsToMany(User, {
  through: TeamUser,
  foreignKey: 'teamId',
  otherKey: 'userId',
  as: 'members'
})

Team.belongsTo(User, {
  foreignKey: createdByForeignKey,
  as: "createdByUser",
})
/** -------------- Team: End -------------- */

/** -------------- News: Begin -------------- */
// NewsLike relationships
NewsLike.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

NewsLike.belongsTo(News, {
  foreignKey: newsForeignKey,
  as: "news"
})

News.hasMany(NewsLike, {
  foreignKey: newsForeignKey,
  as: "newsLikes"
})

User.hasMany(NewsLike, {
  foreignKey: userForeignKey,
  as: "newsLikes"
})

// NewsComment relationships
NewsComment.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

NewsComment.belongsTo(News, {
  foreignKey: newsForeignKey,
  as: "news"
})

News.hasMany(NewsComment, {
  foreignKey: newsForeignKey,
  as: "newsComments"
})

User.hasMany(NewsComment, {
  foreignKey: userForeignKey,
  as: "newsComments"
})

// NewsComment replies relationship
NewsComment.belongsTo(NewsComment, {
  foreignKey: newsCommentParentForeignKey,
  as: "newsComment"
})

NewsComment.hasMany(NewsComment, {
  foreignKey: newsCommentParentForeignKey,
  as: "replies"
})

// NewsCommentLike relationship
NewsCommentLike.belongsTo(NewsComment, {
  foreignKey: newsCommentForeignKey,
  as: "newsComment"
})

NewsComment.hasMany(NewsCommentLike, {
  foreignKey: newsCommentForeignKey,
  as: "newsCommentLikes"
})

NewsCommentLike.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

User.hasMany(NewsCommentLike, {
  foreignKey: userForeignKey,
  as: "newsCommentLikes"
})

// NewsView relationships
NewsView.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

NewsView.belongsTo(News, {
  foreignKey: newsForeignKey,
  as: "news"
})

News.hasMany(NewsView, {
  foreignKey: newsForeignKey,
  as: "newsViews"
})

User.hasMany(NewsView, {
  foreignKey: userForeignKey,
  as: "newsViews"
})
/** -------------- News: End -------------- */

/** -------------- Forum: Begin -------------- */
// ForumCategory relationships
ForumCategory.belongsTo(User, {
  foreignKey: createdByForeignKey,
  as: "user"
})

User.hasMany(ForumCategory, {
  foreignKey: createdByForeignKey,
  as: "forumCategories"
})

ForumCategory.hasMany(Forum, {
  foreignKey: forumCategoryForeignKey,
  as: "forums"
})

// Forum relationships
Forum.belongsTo(ForumCategory, {
  foreignKey: forumCategoryForeignKey,
  as: "forumCategory"
})

Forum.belongsTo(User, {
  foreignKey: createdByForeignKey,
  as: "user"
})

User.hasMany(Forum, {
  foreignKey: createdByForeignKey,
  as: "forums"
})

Forum.hasMany(ForumTopic, {
  foreignKey: forumForeignKey,
  as: "forumTopics"
})

// ForumTopic relationships
ForumTopic.belongsTo(Forum, {
  foreignKey: forumForeignKey,
  as: "forum"
})

ForumTopic.belongsTo(User, {
  foreignKey: createdByForeignKey,
  as: "user"
})

User.hasMany(ForumTopic, {
  foreignKey: createdByForeignKey,
  as: "forumTopics"
})

ForumTopic.hasMany(ForumPost, {
  foreignKey: forumTopicForeignKey,
  as: "forumPosts"
})

// ForumTopic View relationships
ForumTopicView.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

ForumTopicView.belongsTo(ForumTopic, {
  foreignKey: forumTopicForeignKey,
  as: "forumTopic"
})

ForumTopic.hasMany(ForumTopicView, {
  foreignKey: forumTopicForeignKey,
  as: "forumTopicViews"
})

User.hasMany(ForumTopicView, {
  foreignKey: userForeignKey,
  as: "forumTopicViews"
})

// ForumTopicPost relationships
ForumPost.belongsTo(ForumTopic, {
  foreignKey: forumTopicForeignKey,
  as: "forumTopic"
})

ForumPost.belongsTo(User, {
  foreignKey: createdByForeignKey,
  as: "user"
})

User.hasMany(ForumPost, {
  foreignKey: createdByForeignKey,
  as: "forumPosts"
})

// ForumTopicPost like and dislike relationships
ForumPostLikeDislike.belongsTo(User, {
  foreignKey: userForeignKey,
  as: "user"
})

ForumPostLikeDislike.belongsTo(ForumPost, {
  foreignKey: forumPostForeignKey,
  as: "forumPost"
})

ForumPost.hasMany(ForumPostLikeDislike, {
  foreignKey: forumPostForeignKey,
  as: "forumPostLikeDislikes"
})

User.hasMany(ForumPostLikeDislike, {
  foreignKey: userForeignKey,
  as: "forumPostLikeDislikes"
})
/** -------------- Forum: End -------------- */

/** -------------- Contest: Begin -------------- */
// N:N relationship
User.belongsToMany(Contest, {
  through: 'contest_user',
  foreignKey: userForeignKey,
  as: 'contests',
})
// N:N relationship
Contest.belongsToMany(User, {
  through: 'contest_user',
  foreignKey: contestForeignKey,
  as: 'users',

})

// for createdBy column in Contest
Contest.belongsTo(User, {
  foreignKey: {
    name: DATABASE_FOREIGN_KEY.CREATED_BY,
    allowNull: false
  },
  as: "creator"
})

// for deletedBy column in Contest
Contest.belongsTo(User, {
  foreignKey: {
    name: DATABASE_FOREIGN_KEY.DELETED_BY,
    allowNull: true
  },
  as: "deleter"
})


ContestCalendar.belongsTo(User, {
  foreignKey: {
    name: DATABASE_FOREIGN_KEY.USER_ID,
    allowNull: false
  },
  as: "user"
})

ContestCalendar.belongsTo(Contest, {
  foreignKey: {
    name: DATABASE_FOREIGN_KEY.CONTEST_ID,
    allowNull: false
  },
  as: "contest"
})
/** -------------- Contest: End -------------- */

/** +++++ -------------- Association: End -------------- +++++ */

const database = {}
database[User.name] = User
database[UserProfile.name] = UserProfile
database[UserEducation.name] = UserEducation
database[UserWorkExperience.name] = UserWorkExperience
database[Team.name] = Team
database[TeamUser.name] = TeamUser
database[News.name] = News
database[NewsLike.name] = NewsLike
database[NewsComment.name] = NewsComment
database[NewsCommentLike.name] = NewsCommentLike
database[NewsView.name] = NewsView
database[Faq.name] = Faq

database[Forum.name] = Forum
database[ForumCategory.name] = ForumCategory
database[ForumTopic.name] = ForumTopic
database[ForumPost.name] = ForumPost
database[ForumPostLikeDislike.name] = ForumPostLikeDislike
database[ForumTopicView.name] = ForumTopicView

database[Contest.name] = Contest
database[ContestCalendar.name] = ContestCalendar

database.connection = connection
module.exports = database
