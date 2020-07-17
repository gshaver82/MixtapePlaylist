-- use this code to see whats in all the tables in workbench
-- remember to click the different tabs at the bottom of the table to switch tables

USE mixtape_db;

SELECT * from users;
SELECT * from Playlists;
SELECT * from votes;
SELECT * from songs;
SELECT * from playlist_song_junction_table;

-- http://localhost:3000/api/playlists/include_all
-- http://localhost:3000/api/playlists/user/bob