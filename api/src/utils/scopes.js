const { expose } = require('./expose');

// User info
const user = {};
const userKeys = {
  expose: [
    'id',
    'email',
    'accessLevel',
  ],
  token: ['token'],
  info: [
    'id',
    'state',
  ],
};

user.expose = expose(userKeys.expose);
user.expose.token = expose([...userKeys.expose, ...userKeys.token]);
user.expose.info = expose([...userKeys.expose, ...userKeys.info]);

exports.user = user;

// Content info 
const content = {};
const contentKeys = {
  expose: [
    'slug',
    'title',
    'content_html',
    'content_markdown',
    'topicSlug',
    'span',
  ],
};


content.expose = expose(contentKeys.expose);

exports.content = content;

// Course info
const course = {};
const courseKeys = {
  expose: [
    'slug',
    'title',
    'createdAt',
  ],
  full: [
    'description',
    'module.title',
    'module.slug',
    'module.resource',
    'module.resource',
  ],
};

course.expose = expose(courseKeys.expose);
course.expose.full = expose([...courseKeys.expose, ...courseKeys.full]);

exports.course = course;

// Module info
const modules = {};
const moduleKeys = {
  expose: [
    'title',
    'slug',
    'description',
  ],
  full: [
    'resources.title',
    'resources.slug',
    'topic.title',
    'topic.slug',
    'topic.content',
  ],
};

modules.expose = expose(moduleKeys.expose);
modules.expose.full = expose([...moduleKeys.expose, ...moduleKeys.full]);

exports.module = modules;

// Resources info
const resources = {};
const resourcesKeys = {
  expose: [
    'slug',
    'title',
    'link',
    'moduleSlug',
  ],
};

resources.expose = expose(resourcesKeys.expose);

exports.resources = resources;

// Topic info
const topic = {};
const topicKeys = {
  expose: [
    'slug',
    'title',
    'moduleSlug',
    'span',
  ],
};

topic.expose = expose(topicKeys.expose);

exports.topic = topic;


// Error info
const error = {};

error.expose = expose(topicKeys.expose);

exports.error = error;

// Student info
const student = {};
const studentKeys = {
  expose: [
    'name',
    'surname',
    'birthdate',
    'nationality',
  ],
};

student.expose = expose(studentKeys.expose);

exports.student = student;
