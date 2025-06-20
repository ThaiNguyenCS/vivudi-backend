/**
 * IoC container
 */
import { container } from 'tsyringe';
import AuthService from '../services/AuthService';
import AuthController from '../controllers/Auth.controller';
import AuthRepository from '../repository/Auth.repository';
import EmailService from '../services/EmailService';
import UserProfileService from '../services/UserProfileService';
import UserProfileController from '../controllers/UserProfile.controller';
import UserProfileRepository from '../repository/UserProfile.repository';
import PostController from '../controllers/Post.controller';
import PostService from '../services/PostService';
import PostRepository from '../repository/Post.repository';
// Register repositories
container.register('AuthRepository', {
    useClass: AuthRepository
});

container.register('UserProfileRepository', {
    useClass: UserProfileRepository
});

container.register('PostRepository', {
    useClass: PostRepository
});
// Register services
container.register('AuthService', {
    useClass: AuthService
});

container.register('EmailService', {
    useClass: EmailService
});

container.register('UserProfileService', {
    useClass: UserProfileService
});

container.register('PostService', {
    useClass: PostService
});

// Register controllers
container.register('AuthController', {
    useClass: AuthController
});

container.register('UserProfileController', {
    useClass: UserProfileController
});

container.register('PostController', {
    useClass: PostController

})

export default container;