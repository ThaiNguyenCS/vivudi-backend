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

// Register repositories
container.register('AuthRepository', {
    useClass: AuthRepository
});

container.register('UserProfileRepository', {
    useClass: UserProfileRepository
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

// Register controllers
container.register('AuthController', {
    useClass: AuthController
});

container.register('UserProfileController', {
    useClass: UserProfileController
});

export default container;