-- Seed data for projects table (only if table is empty)
INSERT IGNORE INTO projects (id, title, description, github_url, image_url) VALUES
(1, 'E-Commerce Platform', 'A full-stack e-commerce platform built with React and Spring Boot', 'https://github.com/example/ecommerce', 'https://via.placeholder.com/400x300'),
(2, 'Task Management App', 'A collaborative task management application with real-time updates', 'https://github.com/example/taskmanager', 'https://via.placeholder.com/400x300'),
(3, 'Weather Dashboard', 'A beautiful weather dashboard with location-based forecasts', 'https://github.com/example/weather', 'https://via.placeholder.com/400x300');

-- Seed technologies for projects
INSERT IGNORE INTO project_technologies (project_id, technology) VALUES
(1, 'React'),
(1, 'Spring Boot'),
(1, 'MySQL'),
(2, 'React'),
(2, 'Node.js'),
(2, 'MongoDB'),
(3, 'Vue.js'),
(3, 'Express'),
(3, 'PostgreSQL');

