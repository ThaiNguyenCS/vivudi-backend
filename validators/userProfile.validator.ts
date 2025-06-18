import Joi from 'joi';
import { SEXES } from '../models/UserProfile.model';

export const createProfileSchema = Joi.object({
    first_name: Joi.string().min(1).max(50).required().messages({
        'string.min': 'First name must be at least 1 character long',
        'string.max': 'First name must not exceed 50 characters',
        'any.required': 'First name is required'
    }),
    last_name: Joi.string().min(1).max(50).required().messages({
        'string.min': 'Last name must be at least 1 character long',
        'string.max': 'Last name must not exceed 50 characters',
        'any.required': 'Last name is required'
    }),
    sex: Joi.string().valid(...Object.values(SEXES)).required().messages({
        'any.only': 'Sex must be one of: male, female, other',
        'any.required': 'Sex is required'
    }),
    dob: Joi.date().max('now').required().messages({
        'date.max': 'Date of birth cannot be in the future',
        'any.required': 'Date of birth is required'
    }),
    display_name: Joi.string().min(1).max(100).required().messages({
        'string.min': 'Display name must be at least 1 character long',
        'string.max': 'Display name must not exceed 100 characters',
        'any.required': 'Display name is required'
    }),
    description: Joi.string().max(500).optional().allow('').messages({
        'string.max': 'Description must not exceed 500 characters'
    }),
    avt_url: Joi.string().uri().optional().allow('').messages({
        'string.uri': 'Avatar URL must be a valid URL'
    }),
    background_url: Joi.string().uri().optional().allow('').messages({
        'string.uri': 'Background URL must be a valid URL'
    })
});

export const updateProfileSchema = Joi.object({
    first_name: Joi.string().min(1).max(50).optional().messages({
        'string.min': 'First name must be at least 1 character long',
        'string.max': 'First name must not exceed 50 characters'
    }),
    last_name: Joi.string().min(1).max(50).optional().messages({
        'string.min': 'Last name must be at least 1 character long',
        'string.max': 'Last name must not exceed 50 characters'
    }),
    sex: Joi.string().valid(...Object.values(SEXES)).optional().messages({
        'any.only': 'Sex must be one of: male, female, other'
    }),
    dob: Joi.date().max('now').optional().messages({
        'date.max': 'Date of birth cannot be in the future'
    }),
    display_name: Joi.string().min(1).max(100).optional().messages({
        'string.min': 'Display name must be at least 1 character long',
        'string.max': 'Display name must not exceed 100 characters'
    }),
    description: Joi.string().max(500).optional().allow('').messages({
        'string.max': 'Description must not exceed 500 characters'
    }),
    avt_url: Joi.string().uri().optional().allow('').messages({
        'string.uri': 'Avatar URL must be a valid URL'
    }),
    background_url: Joi.string().uri().optional().allow('').messages({
        'string.uri': 'Background URL must be a valid URL'
    })
}); 