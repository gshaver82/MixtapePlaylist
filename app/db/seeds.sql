-- if force true is in the server.js for the sequelize function you will need to add dummy data
-- to test with, run this code in workbench to quickly get something put in


USE mixtape_db;

INSERT INTO users (id, first_name, last_name, email, role, username, password, last_login, createdAt, updatedAt)
VALUES 
    ('1', 'Peter', 'Baker', 'baker644@umn.edu', 'admin', 'baker644', '$argon2i$v=19$m=4096,t=3,p=1$13ADFWBoE1IfLnLYthgEOQ$Bx49JkVO9ZFq3rbtQAJbsOtwCCJCHyJ40aL6VM9PV00', NULL, '2020-07-11 01:07:53', '2020-07-11 01:07:53'),
    ('2', 'Gene', 'Shaver', 'Gene@theguy.com', 'user', 'Gene123', '$argon2i$v=19$m=4096,t=3,p=1$o6U4v3HvDJhD6fhHKtYfMg$il9hu6Hm+Ykd4juDbvG3nYR4dnQ5bjF8YvCAxypV/ms', NULL, '2020-07-11 01:10:32', '2020-07-11 01:10:32'),
    ('3', 'Vanida', 'Somchaleunsouk', 'vanida@whatever.com', 'user', 'vsomsouk', '$argon2i$v=19$m=4096,t=3,p=1$Q0YvBlS0/uaQbqJv4IOKYQ$c24CeKl14xabEPHzLj9JrIT7MEiHrUqwyovBrNX5xhQ', NULL, '2020-07-11 01:12:20', '2020-07-11 01:12:20');

INSERT INTO playlists (id, title, string, createdAt, updatedAt, UserId)
VALUES 
	(1,"Peter's Playlist", 'Some current favorites, not good to code to', '2020-07-09 23:07:58','2020-07-09 23:07:58',1),
    (2,"Gene's Playlist", 'Gotta love orchestrals', '2020-07-09 23:07:58','2020-07-09 23:07:58',2),
    (3,"Vanida's Playlist", 'Summer jams anyone?','2020-07-09 23:07:58','2020-07-09 23:07:58',3);

INSERT INTO votes (id, upvote, createdAt, updatedAt, UserId, PlaylistId)
VALUES 
	(id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,1), 
    (id,-1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,2),
    (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,3), 
    (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',2,3), 
    (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',3,3), 
    (id,-1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',2,1), 
    (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',3,1);

INSERT INTO songs (id, song_title, song_artist,createdAt, updatedAt)
VALUES 
	(id,'Imperial March','John Williams', '2020-07-09 23:07:58','2020-07-09 23:07:58'), 
    (id,'Olympic Theme','John Williams', '2020-07-09 23:07:58','2020-07-09 23:07:58'), 
    (id,'Procession of the Nobles','Nikolai Rimsky-Korsakov', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Consequences of Jealousy','Robert Glasper', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Lovely Day','Bill Withers', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Sinnerman','Nina Simone', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Kind of Blue','Miles Davis', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Bloody Waters','Kendrick Lamar', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'This is America','Childish Gambino', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'DO IT','KAYTRANADA', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Ocean Wide, Canyon Deep (feat. Laura Mvula)','Jacob Collier', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Rockstar','DaBaby Featuring Roddy Ricch', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Whats Poppin','Jack Harlow Featuring DaBaby, Tory Lanez & Lil Wayne', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Savage','Megan Thee Tallion Featuring Beyonce', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Roses','SAINt JHN', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Say So','Doja Cat Featuring Nicki Minaj', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Intentions','Justin Bieber Featuring Quavo', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Watermelon Sugar','Harry Styles', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'Blueberry Faygo','Lil Mosey', '2020-07-09 23:07:58','2020-07-09 23:07:58'),
    (id,'We Paid','Lil Baby & 42 Dugg', '2020-07-09 23:07:58','2020-07-09 23:07:58');

INSERT INTO playlist_song_junction_table (createdAt, updatedAt,PlaylistId, SongId)
VALUES 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',2,1), 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',2,2),
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',2,3), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,4), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,5), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,6), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,7), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,8), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,9), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,10), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,11), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,12), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,13), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,14), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,15),
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,16), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,17), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,18),
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,19), 
    ('2020-07-09 23:07:58','2020-07-09 23:07:58',3,20);  
