CREATE TABLE IF NOT EXISTS activities (
  id CHAR(36) PRIMARY KEY NOT NULL,
  create_time DATETIME NOT NULL,
  title VARCHAR(100) NOT NULL,
  activity_des VARCHAR(200),
  activity_date DATE,
  link VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS routes (
  id CHAR(36) PRIMARY KEY NOT NULL,
  activity_id CHAR(36) NOT NULL,
  create_time DATETIME NOT NULL,
  coordinates MEDIUMTEXT NOT NULL,
  trip_mode INT(2) NOT NULL,
  duration INT(4),
  distance INT(8),
  FOREIGN KEY(activity_id) REFERENCES activities(id)
);

CREATE TABLE IF NOT EXISTS locations (
  id CHAR(36) PRIMARY KEY NOT NULL,
  activity_id CHAR(36) NOT NULL,
  create_time DATETIME NOT NULL,
  coordinates VARCHAR(40) NOT NULL,
  location_name INT(2) NOT NULL,
  tag VARCHAR(20)
);
