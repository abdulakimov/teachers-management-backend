CREATE TABLE subjects (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
);

CREATE TABLE teachers (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    teacher_name VARCHAR(50) NOT NULL,
    degree VARCHAR(50) NOT NULL,
    subject_id BIGINT REFERENCES subjects(id) NOT NULL,
);

