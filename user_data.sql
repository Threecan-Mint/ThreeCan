CREATE TABLE user_identifiers (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY REFERENCES user_identifiers(id),
    email VARCHAR(255) NOT NULL UNIQUE,
    canva_user_id VARCHAR(255) NOT NULL,
    auth0_id VARCHAR(255)
);

CREATE TABLE user_credits (
    user_id INT PRIMARY KEY REFERENCES user_identifiers(id),
    credits INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    canva_team_id VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE team_memberships (
    user_id INT REFERENCES user_identifiers(id),
    team_id INT REFERENCES teams(id),
    PRIMARY KEY (user_id, team_id)
);
