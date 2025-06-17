/**
 * IoC container
 */
import { container } from 'tsyringe';
import AuthService from '../services/AuthService';
import AuthController from '../controllers/Auth.controller';
import AuthRepository from '../repository/Auth.repository';
import EmailService from '../services/EmailService';

// Register repositories
container.register('AuthRepository', {
    useClass: AuthRepository
});

// Register services
container.register('AuthService', {
    useClass: AuthService
});

container.register('EmailService', {
    useClass: EmailService
});

// Register controllers
container.register('AuthController', {
    useClass: AuthController
});

export default container;