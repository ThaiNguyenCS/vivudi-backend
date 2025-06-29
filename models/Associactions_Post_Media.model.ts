import Post from "./Post.model";
import Media from "./Media.model";

Post.hasMany(Media, {
  foreignKey: 'post_id',
  sourceKey: 'id'
})

Media.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id'
})