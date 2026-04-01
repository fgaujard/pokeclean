-- Nettoyer les données existantes
TRUNCATE TABLE "card_owned", "card", "set", "booster", "pokemon", "task_history", "asked_task", "shopping_task", "planned_task", "unplanned_task", "task", "user", "avatar" RESTART IDENTITY CASCADE;

-- Insérer les avatars d'abord
INSERT INTO "avatar" ("image_url") VALUES
('avatars/sprite104.gif'),
('avatars/sprite150-1.gif'),
('avatars/sprite94.gif');

-- Insérer les utilisateurs avec les références aux avatars
INSERT INTO "user" ("username", "aka", "avatar_id", "bio", "wallet") VALUES
('Nathan', 'Nathanyahu', 1, 'Dresseur déterminé, Nathanyahu ne fait preuve d''aucune pitié à l''égard de ses adversaires. Il n''hésite pas à réutiliser les stratégies de ses précédents ennemis tels qu''un certain dresseur allemand.', 1000),
('Pav', 'TekPav', 2, 'Stratège brillant et passionné de technologie, Pav analyse chaque combat avec précision. Sa maîtrise des Pokémon Psy lui permet d''anticiper les mouvements de ses adversaires.', 1500),
('Flav', 'Flavito', 3, 'Mystérieux et imprévisible, Flav préfère les stratégies non conventionnelles. Expert en Pokémon Spectre, il sait comment surprendre ses adversaires dans les moments les plus inattendus.', 2000);

-- Tâches UNPLANNED (ponctuelles, se débloquent après un certain temps)
INSERT INTO "task" ("title", "content", "room", "grade", "type") VALUES
('Sortir les poubelles', 'Vider toutes les poubelles de la maison et les descendre dans le local', 'ALL_HOUSE', 'C', 'UNPLANNED'),
('Nettoyer le micro-ondes', 'Nettoyer l''intérieur et l''extérieur du micro-ondes avec un chiffon humide', 'KITCHEN', 'C', 'UNPLANNED'),
('Désinfecter les poignées de porte', 'Utiliser un désinfectant pour nettoyer toutes les poignées de porte de la maison', 'ALL_HOUSE', 'B', 'UNPLANNED'),
('Changer les draps', 'Retirer les draps sales et mettre des draps propres sur les lits', 'BATHROOM', 'A', 'UNPLANNED'),
('Nettoyer le tapis', 'Passer l''aspirateur en profondeur sur le tapis du salon', 'BALCONY', 'B', 'UNPLANNED'),
('Organiser le placard', 'Ranger et organiser les vêtements et accessoires dans le placard', 'CORRIDOR', 'C', 'UNPLANNED'),
('Nettoyer le réfrigérateur', 'Vider, nettoyer les étagères et jeter les produits périmés', 'KITCHEN', 'B', 'UNPLANNED'),
('Détartrer la cafetière', 'Faire un cycle de détartrage complet avec du vinaigre blanc', 'KITCHEN', 'C', 'UNPLANNED'),
('Laver les vitres', 'Nettoyer toutes les vitres de la maison à l''intérieur et à l''extérieur', 'ALL_HOUSE', 'A', 'UNPLANNED'),
('Nettoyer le four', 'Dégraisser le four en profondeur avec un produit adapté', 'KITCHEN', 'B', 'UNPLANNED'),
('Dépoussiérer les radiateurs', 'Passer l''aspirateur derrière et sur les radiateurs', 'ALL_HOUSE', 'C', 'UNPLANNED');

INSERT INTO "unplanned_task" ("task_id", "days_until_next_execution") VALUES
(1, 7),
(2, 30),
(3, 60),
(4, 90),
(5, 90),
(6, 14),
(7, 45),
(8, 60),
(9, 30),
(10, 90),
(11, 60);

-- Tâches PLANNED (cycliques avec date de début et limite d'exécution)
INSERT INTO "task" ("title", "content", "room", "grade", "type") VALUES
('Nettoyer la cuisine', 'Nettoyer le plan de travail, l''évier, la plaque de cuisson et la hotte', 'KITCHEN', 'B', 'PLANNED'),
('Passer l''aspirateur', 'Aspirer tous les sols de la maison (chambres, salon, couloir)', 'ALL_HOUSE', 'B', 'PLANNED'),
('Nettoyer la salle de bain', 'Nettoyer le lavabo, la douche, la baignoire et les miroirs', 'BATHROOM', 'A', 'PLANNED'),
('Nettoyer les toilettes', 'Nettoyer la cuvette, le siège, le réservoir et le sol autour', 'TOILETS', 'B', 'PLANNED'),
('Laver le sol', 'Passer la serpillière dans toute la maison', 'ALL_HOUSE', 'A', 'PLANNED'),
('Ranger le couloir', 'Remettre les chaussures dans le meuble et organiser les manteaux', 'CORRIDOR', 'C', 'PLANNED'),
('Nettoyer le balcon', 'Balayer le balcon et nettoyer les vitres extérieures', 'BALCONY', 'B', 'PLANNED');

INSERT INTO "planned_task" ("task_id", "recurrence", "recurrence_interval", "execution_limit_days") VALUES
(12, 'WEEK', 1, 7),
(13, 'WEEK', 1, 7),
(14, 'WEEK', 1, 7),
(15, 'WEEK', 1, 3),
(16, 'WEEK', 1, 7),
(17, 'WEEK', 1, 7),
(18, 'WEEK', 2, 14);

-- Tâches ASKED (à la volée, créées par un utilisateur)
INSERT INTO "task" ("title", "content", "room", "grade", "type") VALUES
('Ranger ma chambre', 'Faire mon lit, ranger les vêtements et organiser mon bureau', NULL, 'C', 'ASKED'),
('Faire la vaisselle', 'Laver toute la vaisselle sale et la ranger dans les placards', 'KITCHEN', 'C', 'ASKED'),
('Arroser les plantes', 'Arroser toutes les plantes d''intérieur et vérifier leur état', 'ALL_HOUSE', 'C', 'ASKED'),
('Repasser le linge', 'Repasser les chemises, pantalons et draps propres', NULL, 'B', 'ASKED'),
('Nettoyer les miroirs', 'Nettoyer tous les miroirs de la maison avec du produit à vitre', 'ALL_HOUSE', 'C', 'ASKED');

INSERT INTO "asked_task" ("task_id", "creator_id") VALUES
(19, 1),
(20, 2),
(21, 3),
(22, 1),
(23, 2);

INSERT INTO "pokemon" ("pokedex_id", "name", "front_sprite_url", "image_url", "types", "stats", "pkmn_generation") VALUES
(1, 'Bulbizarre', 'pokemons/sprites/001.png', 'pokemons/images/001.png', '{GRASS, POISON}', '{"hp":45,"attack":49,"defense":49,"specialAttack":65,"specialDefense":65,"speed":45}'::json, 1),
(2, 'Herbizarre', 'pokemons/sprites/002.png', 'pokemons/images/002.png', '{GRASS, POISON}', '{"hp":60,"attack":62,"defense":63,"specialAttack":80,"specialDefense":80,"speed":60}'::json, 1),
(3, 'Florizarre', 'pokemons/sprites/003.png', 'pokemons/images/003.png', '{GRASS, POISON}', '{"hp":80,"attack":82,"defense":83,"specialAttack":100,"specialDefense":100,"speed":80}'::json, 1),
(4, 'Salamèche', 'pokemons/sprites/004.png', 'pokemons/images/004.png', '{FIRE}', '{"hp":39,"attack":52,"defense":43,"specialAttack":60,"specialDefense":50,"speed":65}'::json, 1),
(5, 'Reptincel', 'pokemons/sprites/005.png', 'pokemons/images/005.png', '{FIRE}', '{"hp":58,"attack":64,"defense":58,"specialAttack":80,"specialDefense":65,"speed":80}'::json, 1),
(6, 'Dracaufeu', 'pokemons/sprites/006.png', 'pokemons/images/006.png', '{FIRE, FLYING}', '{"hp":78,"attack":84,"defense":78,"specialAttack":109,"specialDefense":85,"speed":100}'::json, 1),
(7, 'Carapuce', 'pokemons/sprites/007.png', 'pokemons/images/007.png', '{WATER}', '{"hp":44,"attack":48,"defense":65,"specialAttack":50,"specialDefense":64,"speed":43}'::json, 1),
(8, 'Carabaffe', 'pokemons/sprites/008.png', 'pokemons/images/008.png', '{WATER}', '{"hp":59,"attack":63,"defense":80,"specialAttack":65,"specialDefense":80,"speed":58}'::json, 1),
(9, 'Tortank', 'pokemons/sprites/009.png', 'pokemons/images/009.png', '{WATER}', '{"hp":79,"attack":83,"defense":100,"specialAttack":85,"specialDefense":105,"speed":78}'::json, 1),
(10, 'Chenipan', 'pokemons/sprites/010.png', 'pokemons/images/010.png', '{BUG}', '{"hp":45,"attack":30,"defense":35,"specialAttack":20,"specialDefense":20,"speed":45}'::json, 1),
(11, 'Chrysacier', 'pokemons/sprites/011.png', 'pokemons/images/011.png', '{BUG}', '{"hp":50,"attack":20,"defense":55,"specialAttack":25,"specialDefense":25,"speed":30}'::json, 1),
(12, 'Papilusion', 'pokemons/sprites/012.png', 'pokemons/images/012.png', '{BUG, FLYING}', '{"hp":60,"attack":45,"defense":50,"specialAttack":90,"specialDefense":80,"speed":70}'::json, 1),
(13, 'Aspicot', 'pokemons/sprites/013.png', 'pokemons/images/013.png', '{BUG, POISON}', '{"hp":40,"attack":35,"defense":30,"specialAttack":20,"specialDefense":20,"speed":50}'::json, 1),
(14, 'Coconfort', 'pokemons/sprites/014.png', 'pokemons/images/014.png', '{BUG, POISON}', '{"hp":45,"attack":25,"defense":50,"specialAttack":25,"specialDefense":25,"speed":35}'::json, 1),
(15, 'Dardargnan', 'pokemons/sprites/015.png', 'pokemons/images/015.png', '{BUG, POISON}', '{"hp":65,"attack":90,"defense":40,"specialAttack":45,"specialDefense":80,"speed":75}'::json, 1),
(16, 'Roucool', 'pokemons/sprites/016.png', 'pokemons/images/016.png', '{NORMAL, FLYING}', '{"hp":40,"attack":45,"defense":40,"specialAttack":35,"specialDefense":35,"speed":56}'::json, 1),
(17, 'Roucoups', 'pokemons/sprites/017.png', 'pokemons/images/017.png', '{NORMAL, FLYING}', '{"hp":63,"attack":60,"defense":55,"specialAttack":50,"specialDefense":50,"speed":71}'::json, 1),
(18, 'Roucarnage', 'pokemons/sprites/018.png', 'pokemons/images/018.png', '{NORMAL, FLYING}', '{"hp":83,"attack":80,"defense":75,"specialAttack":70,"specialDefense":70,"speed":101}'::json, 1),
(19, 'Rattata', 'pokemons/sprites/019.png', 'pokemons/images/019.png', '{NORMAL}', '{"hp":30,"attack":56,"defense":35,"specialAttack":25,"specialDefense":35,"speed":72}'::json, 1),
(20, 'Rattatac', 'pokemons/sprites/020.png', 'pokemons/images/020.png', '{NORMAL}', '{"hp":55,"attack":81,"defense":60,"specialAttack":50,"specialDefense":70,"speed":97}'::json, 1),
(21, 'Piafabec', 'pokemons/sprites/021.png', 'pokemons/images/021.png', '{NORMAL, FLYING}', '{"hp":40,"attack":60,"defense":30,"specialAttack":31,"specialDefense":31,"speed":70}'::json, 1),
(22, 'Rapasdepic', 'pokemons/sprites/022.png', 'pokemons/images/022.png', '{NORMAL, FLYING}', '{"hp":65,"attack":90,"defense":65,"specialAttack":61,"specialDefense":61,"speed":100}'::json, 1),
(23, 'Abo', 'pokemons/sprites/023.png', 'pokemons/images/023.png', '{POISON}', '{"hp":35,"attack":60,"defense":44,"specialAttack":40,"specialDefense":54,"speed":55}'::json, 1),
(24, 'Arbok', 'pokemons/sprites/024.png', 'pokemons/images/024.png', '{POISON}', '{"hp":60,"attack":95,"defense":69,"specialAttack":65,"specialDefense":79,"speed":80}'::json, 1),
(25, 'Pikachu', 'pokemons/sprites/025.png', 'pokemons/images/025.png', '{ELECTRIC}', '{"hp":35,"attack":55,"defense":40,"specialAttack":50,"specialDefense":50,"speed":90}'::json, 1),
(26, 'Raichu', 'pokemons/sprites/026.png', 'pokemons/images/026.png', '{ELECTRIC}', '{"hp":60,"attack":90,"defense":55,"specialAttack":90,"specialDefense":80,"speed":110}'::json, 1),
(27, 'Sabelette', 'pokemons/sprites/027.png', 'pokemons/images/027.png', '{GROUND}', '{"hp":50,"attack":75,"defense":85,"specialAttack":20,"specialDefense":30,"speed":40}'::json, 1),
(28, 'Sablaireau', 'pokemons/sprites/028.png', 'pokemons/images/028.png', '{GROUND}', '{"hp":75,"attack":100,"defense":110,"specialAttack":45,"specialDefense":55,"speed":65}'::json, 1),
(29, 'Nidoran♀', 'pokemons/sprites/029.png', 'pokemons/images/029.png', '{POISON}', '{"hp":55,"attack":47,"defense":52,"specialAttack":40,"specialDefense":40,"speed":41}'::json, 1),
(30, 'Nidorina', 'pokemons/sprites/030.png', 'pokemons/images/030.png', '{POISON}', '{"hp":70,"attack":62,"defense":67,"specialAttack":55,"specialDefense":55,"speed":56}'::json, 1),
(31, 'Nidoqueen', 'pokemons/sprites/031.png', 'pokemons/images/031.png', '{POISON, GROUND}', '{"hp":90,"attack":92,"defense":87,"specialAttack":75,"specialDefense":85,"speed":76}'::json, 1),
(32, 'Nidoran♂', 'pokemons/sprites/032.png', 'pokemons/images/032.png', '{POISON}', '{"hp":46,"attack":57,"defense":40,"specialAttack":40,"specialDefense":40,"speed":50}'::json, 1),
(33, 'Nidorino', 'pokemons/sprites/033.png', 'pokemons/images/033.png', '{POISON}', '{"hp":61,"attack":72,"defense":57,"specialAttack":55,"specialDefense":55,"speed":65}'::json, 1),
(34, 'Nidoking', 'pokemons/sprites/034.png', 'pokemons/images/034.png', '{POISON, GROUND}', '{"hp":81,"attack":102,"defense":77,"specialAttack":85,"specialDefense":75,"speed":85}'::json, 1),
(35, 'Mélofée', 'pokemons/sprites/035.png', 'pokemons/images/035.png', '{FAIRY}', '{"hp":70,"attack":45,"defense":48,"specialAttack":60,"specialDefense":65,"speed":35}'::json, 1),
(36, 'Mélodelfe', 'pokemons/sprites/036.png', 'pokemons/images/036.png', '{FAIRY}', '{"hp":95,"attack":70,"defense":73,"specialAttack":95,"specialDefense":90,"speed":60}'::json, 1),
(37, 'Goupix', 'pokemons/sprites/037.png', 'pokemons/images/037.png', '{FIRE}', '{"hp":38,"attack":41,"defense":40,"specialAttack":50,"specialDefense":65,"speed":65}'::json, 1),
(38, 'Feunard', 'pokemons/sprites/038.png', 'pokemons/images/038.png', '{FIRE}', '{"hp":73,"attack":76,"defense":75,"specialAttack":81,"specialDefense":100,"speed":100}'::json, 1),
(39, 'Rondoudou', 'pokemons/sprites/039.png', 'pokemons/images/039.png', '{NORMAL, FAIRY}', '{"hp":115,"attack":45,"defense":20,"specialAttack":45,"specialDefense":25,"speed":20}'::json, 1),
(40, 'Grodoudou', 'pokemons/sprites/040.png', 'pokemons/images/040.png', '{NORMAL, FAIRY}', '{"hp":140,"attack":70,"defense":45,"specialAttack":85,"specialDefense":50,"speed":45}'::json, 1),
(41, 'Nosferapti', 'pokemons/sprites/041.png', 'pokemons/images/041.png', '{POISON, FLYING}', '{"hp":40,"attack":45,"defense":35,"specialAttack":30,"specialDefense":40,"speed":55}'::json, 1),
(42, 'Nosferalto', 'pokemons/sprites/042.png', 'pokemons/images/042.png', '{POISON, FLYING}', '{"hp":75,"attack":80,"defense":70,"specialAttack":65,"specialDefense":75,"speed":90}'::json, 1),
(43, 'Mystherbe', 'pokemons/sprites/043.png', 'pokemons/images/043.png', '{GRASS, POISON}', '{"hp":45,"attack":50,"defense":55,"specialAttack":75,"specialDefense":65,"speed":30}'::json, 1),
(44, 'Ortide', 'pokemons/sprites/044.png', 'pokemons/images/044.png', '{GRASS, POISON}', '{"hp":60,"attack":65,"defense":70,"specialAttack":85,"specialDefense":75,"speed":40}'::json, 1),
(45, 'Rafflesia', 'pokemons/sprites/045.png', 'pokemons/images/045.png', '{GRASS, POISON}', '{"hp":75,"attack":80,"defense":85,"specialAttack":110,"specialDefense":90,"speed":50}'::json, 1),
(46, 'Paras', 'pokemons/sprites/046.png', 'pokemons/images/046.png', '{BUG, GRASS}', '{"hp":35,"attack":70,"defense":55,"specialAttack":45,"specialDefense":55,"speed":25}'::json, 1),
(47, 'Parasect', 'pokemons/sprites/047.png', 'pokemons/images/047.png', '{BUG, GRASS}', '{"hp":60,"attack":95,"defense":80,"specialAttack":60,"specialDefense":80,"speed":30}'::json, 1),
(48, 'Mimitoss', 'pokemons/sprites/048.png', 'pokemons/images/048.png', '{BUG, POISON}', '{"hp":60,"attack":55,"defense":50,"specialAttack":40,"specialDefense":55,"speed":45}'::json, 1),
(49, 'Aéromite', 'pokemons/sprites/049.png', 'pokemons/images/049.png', '{BUG, POISON}', '{"hp":70,"attack":65,"defense":60,"specialAttack":90,"specialDefense":75,"speed":90}'::json, 1),
(50, 'Taupiqueur', 'pokemons/sprites/050.png', 'pokemons/images/050.png', '{GROUND}', '{"hp":10,"attack":55,"defense":25,"specialAttack":35,"specialDefense":45,"speed":95}'::json, 1),
(51, 'Triopikeur', 'pokemons/sprites/051.png', 'pokemons/images/051.png', '{GROUND}', '{"hp":35,"attack":100,"defense":50,"specialAttack":50,"specialDefense":70,"speed":120}'::json, 1),
(52, 'Miaouss', 'pokemons/sprites/052.png', 'pokemons/images/052.png', '{NORMAL}', '{"hp":40,"attack":45,"defense":35,"specialAttack":40,"specialDefense":40,"speed":90}'::json, 1),
(53, 'Persian', 'pokemons/sprites/053.png', 'pokemons/images/053.png', '{NORMAL}', '{"hp":65,"attack":70,"defense":60,"specialAttack":65,"specialDefense":65,"speed":115}'::json, 1),
(54, 'Psykokwak', 'pokemons/sprites/054.png', 'pokemons/images/054.png', '{WATER}', '{"hp":50,"attack":52,"defense":48,"specialAttack":65,"specialDefense":50,"speed":55}'::json, 1),
(55, 'Akwakwak', 'pokemons/sprites/055.png', 'pokemons/images/055.png', '{WATER}', '{"hp":80,"attack":82,"defense":78,"specialAttack":95,"specialDefense":80,"speed":85}'::json, 1),
(56, 'Férosinge', 'pokemons/sprites/056.png', 'pokemons/images/056.png', '{FIGHTING}', '{"hp":40,"attack":80,"defense":35,"specialAttack":35,"specialDefense":45,"speed":70}'::json, 1),
(57, 'Colossinge', 'pokemons/sprites/057.png', 'pokemons/images/057.png', '{FIGHTING}', '{"hp":65,"attack":105,"defense":60,"specialAttack":60,"specialDefense":70,"speed":95}'::json, 1),
(58, 'Caninos', 'pokemons/sprites/058.png', 'pokemons/images/058.png', '{FIRE}', '{"hp":55,"attack":70,"defense":45,"specialAttack":70,"specialDefense":50,"speed":60}'::json, 1),
(59, 'Arcanin', 'pokemons/sprites/059.png', 'pokemons/images/059.png', '{FIRE}', '{"hp":90,"attack":110,"defense":80,"specialAttack":100,"specialDefense":80,"speed":95}'::json, 1),
(60, 'Ptitard', 'pokemons/sprites/060.png', 'pokemons/images/060.png', '{WATER}', '{"hp":40,"attack":50,"defense":40,"specialAttack":40,"specialDefense":40,"speed":90}'::json, 1),
(61, 'Têtarte', 'pokemons/sprites/061.png', 'pokemons/images/061.png', '{WATER}', '{"hp":65,"attack":65,"defense":65,"specialAttack":50,"specialDefense":50,"speed":90}'::json, 1),
(62, 'Tartard', 'pokemons/sprites/062.png', 'pokemons/images/062.png', '{WATER, FIGHTING}', '{"hp":90,"attack":95,"defense":95,"specialAttack":70,"specialDefense":90,"speed":70}'::json, 1),
(63, 'Abra', 'pokemons/sprites/063.png', 'pokemons/images/063.png', '{PSYCHIC}', '{"hp":25,"attack":20,"defense":15,"specialAttack":105,"specialDefense":55,"speed":90}'::json, 1),
(64, 'Kadabra', 'pokemons/sprites/064.png', 'pokemons/images/064.png', '{PSYCHIC}', '{"hp":40,"attack":35,"defense":30,"specialAttack":120,"specialDefense":70,"speed":105}'::json, 1),
(65, 'Alakazam', 'pokemons/sprites/065.png', 'pokemons/images/065.png', '{PSYCHIC}', '{"hp":55,"attack":50,"defense":45,"specialAttack":135,"specialDefense":95,"speed":120}'::json, 1),
(66, 'Machoc', 'pokemons/sprites/066.png', 'pokemons/images/066.png', '{FIGHTING}', '{"hp":70,"attack":80,"defense":50,"specialAttack":35,"specialDefense":35,"speed":35}'::json, 1),
(67, 'Machopeur', 'pokemons/sprites/067.png', 'pokemons/images/067.png', '{FIGHTING}', '{"hp":80,"attack":100,"defense":70,"specialAttack":50,"specialDefense":60,"speed":45}'::json, 1),
(68, 'Mackogneur', 'pokemons/sprites/068.png', 'pokemons/images/068.png', '{FIGHTING}', '{"hp":90,"attack":130,"defense":80,"specialAttack":65,"specialDefense":85,"speed":55}'::json, 1),
(69, 'Chétiflor', 'pokemons/sprites/069.png', 'pokemons/images/069.png', '{GRASS, POISON}', '{"hp":50,"attack":75,"defense":35,"specialAttack":70,"specialDefense":30,"speed":40}'::json, 1),
(70, 'Boustiflor', 'pokemons/sprites/070.png', 'pokemons/images/070.png', '{GRASS, POISON}', '{"hp":65,"attack":90,"defense":50,"specialAttack":85,"specialDefense":45,"speed":55}'::json, 1),
(71, 'Empiflor', 'pokemons/sprites/071.png', 'pokemons/images/071.png', '{GRASS, POISON}', '{"hp":80,"attack":105,"defense":65,"specialAttack":100,"specialDefense":70,"speed":70}'::json, 1),
(72, 'Tentacool', 'pokemons/sprites/072.png', 'pokemons/images/072.png', '{WATER, POISON}', '{"hp":40,"attack":40,"defense":35,"specialAttack":50,"specialDefense":100,"speed":70}'::json, 1),
(73, 'Tentacruel', 'pokemons/sprites/073.png', 'pokemons/images/073.png', '{WATER, POISON}', '{"hp":80,"attack":70,"defense":65,"specialAttack":80,"specialDefense":120,"speed":100}'::json, 1),
(74, 'Racaillou', 'pokemons/sprites/074.png', 'pokemons/images/074.png', '{ROCK, GROUND}', '{"hp":40,"attack":80,"defense":100,"specialAttack":30,"specialDefense":30,"speed":20}'::json, 1),
(75, 'Gravalanch', 'pokemons/sprites/075.png', 'pokemons/images/075.png', '{ROCK, GROUND}', '{"hp":55,"attack":95,"defense":115,"specialAttack":45,"specialDefense":45,"speed":35}'::json, 1),
(76, 'Grolem', 'pokemons/sprites/076.png', 'pokemons/images/076.png', '{ROCK, GROUND}', '{"hp":80,"attack":120,"defense":130,"specialAttack":55,"specialDefense":65,"speed":45}'::json, 1),
(77, 'Ponyta', 'pokemons/sprites/077.png', 'pokemons/images/077.png', '{FIRE}', '{"hp":50,"attack":85,"defense":55,"specialAttack":65,"specialDefense":65,"speed":90}'::json, 1),
(78, 'Galopa', 'pokemons/sprites/078.png', 'pokemons/images/078.png', '{FIRE}', '{"hp":65,"attack":100,"defense":70,"specialAttack":80,"specialDefense":80,"speed":105}'::json, 1),
(79, 'Ramoloss', 'pokemons/sprites/079.png', 'pokemons/images/079.png', '{WATER, PSYCHIC}', '{"hp":90,"attack":65,"defense":65,"specialAttack":40,"specialDefense":40,"speed":15}'::json, 1),
(80, 'Flagadoss', 'pokemons/sprites/080.png', 'pokemons/images/080.png', '{WATER, PSYCHIC}', '{"hp":95,"attack":75,"defense":110,"specialAttack":100,"specialDefense":80,"speed":30}'::json, 1),
(81, 'Magnéti', 'pokemons/sprites/081.png', 'pokemons/images/081.png', '{ELECTRIC, STEEL}', '{"hp":25,"attack":35,"defense":70,"specialAttack":95,"specialDefense":55,"speed":45}'::json, 1),
(82, 'Magnéton', 'pokemons/sprites/082.png', 'pokemons/images/082.png', '{ELECTRIC, STEEL}', '{"hp":50,"attack":60,"defense":95,"specialAttack":120,"specialDefense":70,"speed":70}'::json, 1),
(83, 'Canarticho', 'pokemons/sprites/083.png', 'pokemons/images/083.png', '{NORMAL, FLYING}', '{"hp":52,"attack":90,"defense":55,"specialAttack":58,"specialDefense":62,"speed":60}'::json, 1),
(84, 'Doduo', 'pokemons/sprites/084.png', 'pokemons/images/084.png', '{NORMAL, FLYING}', '{"hp":35,"attack":85,"defense":45,"specialAttack":35,"specialDefense":35,"speed":75}'::json, 1),
(85, 'Dodrio', 'pokemons/sprites/085.png', 'pokemons/images/085.png', '{NORMAL, FLYING}', '{"hp":60,"attack":110,"defense":70,"specialAttack":60,"specialDefense":60,"speed":110}'::json, 1),
(86, 'Otaria', 'pokemons/sprites/086.png', 'pokemons/images/086.png', '{WATER}', '{"hp":65,"attack":45,"defense":55,"specialAttack":45,"specialDefense":70,"speed":45}'::json, 1),
(87, 'Lamantine', 'pokemons/sprites/087.png', 'pokemons/images/087.png', '{WATER, ICE}', '{"hp":90,"attack":70,"defense":80,"specialAttack":70,"specialDefense":95,"speed":70}'::json, 1),
(88, 'Tadmorv', 'pokemons/sprites/088.png', 'pokemons/images/088.png', '{POISON}', '{"hp":80,"attack":80,"defense":50,"specialAttack":40,"specialDefense":50,"speed":25}'::json, 1),
(89, 'Grotadmorv', 'pokemons/sprites/089.png', 'pokemons/images/089.png', '{POISON}', '{"hp":105,"attack":105,"defense":75,"specialAttack":65,"specialDefense":100,"speed":50}'::json, 1),
(90, 'Kokiyas', 'pokemons/sprites/090.png', 'pokemons/images/090.png', '{WATER}', '{"hp":30,"attack":65,"defense":100,"specialAttack":45,"specialDefense":25,"speed":40}'::json, 1),
(91, 'Crustabri', 'pokemons/sprites/091.png', 'pokemons/images/091.png', '{WATER, ICE}', '{"hp":50,"attack":95,"defense":180,"specialAttack":85,"specialDefense":45,"speed":70}'::json, 1),
(92, 'Fantominus', 'pokemons/sprites/092.png', 'pokemons/images/092.png', '{GHOST, POISON}', '{"hp":30,"attack":35,"defense":30,"specialAttack":100,"specialDefense":35,"speed":80}'::json, 1),
(93, 'Spectrum', 'pokemons/sprites/093.png', 'pokemons/images/093.png', '{GHOST, POISON}', '{"hp":45,"attack":50,"defense":45,"specialAttack":115,"specialDefense":55,"speed":95}'::json, 1),
(94, 'Ectoplasma', 'pokemons/sprites/094.png', 'pokemons/images/094.png', '{GHOST, POISON}', '{"hp":60,"attack":65,"defense":60,"specialAttack":130,"specialDefense":75,"speed":110}'::json, 1),
(95, 'Onix', 'pokemons/sprites/095.png', 'pokemons/images/095.png', '{ROCK, GROUND}', '{"hp":35,"attack":45,"defense":160,"specialAttack":30,"specialDefense":45,"speed":70}'::json, 1),
(96, 'Soporifik', 'pokemons/sprites/096.png', 'pokemons/images/096.png', '{PSYCHIC}', '{"hp":60,"attack":48,"defense":45,"specialAttack":43,"specialDefense":90,"speed":42}'::json, 1),
(97, 'Hypnomade', 'pokemons/sprites/097.png', 'pokemons/images/097.png', '{PSYCHIC}', '{"hp":85,"attack":73,"defense":70,"specialAttack":73,"specialDefense":115,"speed":67}'::json, 1),
(98, 'Krabby', 'pokemons/sprites/098.png', 'pokemons/images/098.png', '{WATER}', '{"hp":30,"attack":105,"defense":90,"specialAttack":25,"specialDefense":25,"speed":50}'::json, 1),
(99, 'Krabboss', 'pokemons/sprites/099.png', 'pokemons/images/099.png', '{WATER}', '{"hp":55,"attack":130,"defense":115,"specialAttack":50,"specialDefense":50,"speed":75}'::json, 1),
(100, 'Voltorbe', 'pokemons/sprites/100.png', 'pokemons/images/100.png', '{ELECTRIC}', '{"hp":40,"attack":30,"defense":50,"specialAttack":55,"specialDefense":55,"speed":100}'::json, 1),
(101, 'Électrode', 'pokemons/sprites/101.png', 'pokemons/images/101.png', '{ELECTRIC}', '{"hp":60,"attack":50,"defense":70,"specialAttack":80,"specialDefense":80,"speed":150}'::json, 1),
(102, 'Noeunoeuf', 'pokemons/sprites/102.png', 'pokemons/images/102.png', '{GRASS, PSYCHIC}', '{"hp":60,"attack":40,"defense":80,"specialAttack":60,"specialDefense":45,"speed":40}'::json, 1),
(103, 'Noadkoko', 'pokemons/sprites/103.png', 'pokemons/images/103.png', '{GRASS, PSYCHIC}', '{"hp":95,"attack":95,"defense":85,"specialAttack":125,"specialDefense":75,"speed":55}'::json, 1),
(104, 'Osselait', 'pokemons/sprites/104.png', 'pokemons/images/104.png', '{GROUND}', '{"hp":50,"attack":50,"defense":95,"specialAttack":40,"specialDefense":50,"speed":35}'::json, 1),
(105, 'Ossatueur', 'pokemons/sprites/105.png', 'pokemons/images/105.png', '{GROUND}', '{"hp":60,"attack":80,"defense":110,"specialAttack":50,"specialDefense":80,"speed":45}'::json, 1),
(106, 'Kicklee', 'pokemons/sprites/106.png', 'pokemons/images/106.png', '{FIGHTING}', '{"hp":50,"attack":120,"defense":53,"specialAttack":35,"specialDefense":110,"speed":87}'::json, 1),
(107, 'Tygnon', 'pokemons/sprites/107.png', 'pokemons/images/107.png', '{FIGHTING}', '{"hp":50,"attack":105,"defense":79,"specialAttack":35,"specialDefense":110,"speed":76}'::json, 1),
(108, 'Excelangue', 'pokemons/sprites/108.png', 'pokemons/images/108.png', '{NORMAL}', '{"hp":90,"attack":55,"defense":75,"specialAttack":60,"specialDefense":75,"speed":30}'::json, 1),
(109, 'Smogo', 'pokemons/sprites/109.png', 'pokemons/images/109.png', '{POISON}', '{"hp":40,"attack":65,"defense":95,"specialAttack":60,"specialDefense":45,"speed":35}'::json, 1),
(110, 'Smogogo', 'pokemons/sprites/110.png', 'pokemons/images/110.png', '{POISON}', '{"hp":65,"attack":90,"defense":120,"specialAttack":85,"specialDefense":70,"speed":60}'::json, 1),
(111, 'Rhinocorne', 'pokemons/sprites/111.png', 'pokemons/images/111.png', '{GROUND, ROCK}', '{"hp":80,"attack":85,"defense":95,"specialAttack":30,"specialDefense":30,"speed":25}'::json, 1),
(112, 'Rhinoféros', 'pokemons/sprites/112.png', 'pokemons/images/112.png', '{GROUND, ROCK}', '{"hp":105,"attack":130,"defense":120,"specialAttack":45,"specialDefense":45,"speed":40}'::json, 1),
(113, 'Leveinard', 'pokemons/sprites/113.png', 'pokemons/images/113.png', '{NORMAL}', '{"hp":250,"attack":5,"defense":5,"specialAttack":35,"specialDefense":105,"speed":50}'::json, 1),
(114, 'Saquedeneu', 'pokemons/sprites/114.png', 'pokemons/images/114.png', '{GRASS}', '{"hp":65,"attack":55,"defense":115,"specialAttack":100,"specialDefense":40,"speed":60}'::json, 1),
(115, 'Kangourex', 'pokemons/sprites/115.png', 'pokemons/images/115.png', '{NORMAL}', '{"hp":105,"attack":95,"defense":80,"specialAttack":40,"specialDefense":80,"speed":90}'::json, 1),
(116, 'Hypotrempe', 'pokemons/sprites/116.png', 'pokemons/images/116.png', '{WATER}', '{"hp":30,"attack":40,"defense":70,"specialAttack":70,"specialDefense":25,"speed":60}'::json, 1),
(117, 'Hypocéan', 'pokemons/sprites/117.png', 'pokemons/images/117.png', '{WATER}', '{"hp":55,"attack":65,"defense":95,"specialAttack":95,"specialDefense":45,"speed":85}'::json, 1),
(118, 'Poissirène', 'pokemons/sprites/118.png', 'pokemons/images/118.png', '{WATER}', '{"hp":45,"attack":67,"defense":60,"specialAttack":35,"specialDefense":50,"speed":63}'::json, 1),
(119, 'Poissoroy', 'pokemons/sprites/119.png', 'pokemons/images/119.png', '{WATER}', '{"hp":80,"attack":92,"defense":65,"specialAttack":65,"specialDefense":80,"speed":68}'::json, 1),
(120, 'Stari', 'pokemons/sprites/120.png', 'pokemons/images/120.png', '{WATER}', '{"hp":30,"attack":45,"defense":55,"specialAttack":70,"specialDefense":55,"speed":85}'::json, 1),
(121, 'Staross', 'pokemons/sprites/121.png', 'pokemons/images/121.png', '{WATER, PSYCHIC}', '{"hp":60,"attack":75,"defense":85,"specialAttack":100,"specialDefense":85,"speed":115}'::json, 1),
(122, 'M.Mime', 'pokemons/sprites/122.png', 'pokemons/images/122.png', '{PSYCHIC, FAIRY}', '{"hp":40,"attack":45,"defense":65,"specialAttack":100,"specialDefense":120,"speed":90}'::json, 1),
(123, 'Insécateur', 'pokemons/sprites/123.png', 'pokemons/images/123.png', '{BUG, FLYING}', '{"hp":70,"attack":110,"defense":80,"specialAttack":55,"specialDefense":80,"speed":105}'::json, 1),
(124, 'Lippoutou', 'pokemons/sprites/124.png', 'pokemons/images/124.png', '{ICE, PSYCHIC}', '{"hp":65,"attack":50,"defense":35,"specialAttack":115,"specialDefense":95,"speed":95}'::json, 1),
(125, 'Élektek', 'pokemons/sprites/125.png', 'pokemons/images/125.png', '{ELECTRIC}', '{"hp":65,"attack":83,"defense":57,"specialAttack":95,"specialDefense":85,"speed":105}'::json, 1),
(126, 'Magmar', 'pokemons/sprites/126.png', 'pokemons/images/126.png', '{FIRE}', '{"hp":65,"attack":95,"defense":57,"specialAttack":100,"specialDefense":85,"speed":93}'::json, 1),
(127, 'Scarabrute', 'pokemons/sprites/127.png', 'pokemons/images/127.png', '{BUG}', '{"hp":65,"attack":125,"defense":100,"specialAttack":55,"specialDefense":70,"speed":85}'::json, 1),
(128, 'Tauros', 'pokemons/sprites/128.png', 'pokemons/images/128.png', '{NORMAL}', '{"hp":75,"attack":100,"defense":95,"specialAttack":40,"specialDefense":70,"speed":110}'::json, 1),
(129, 'Magicarpe', 'pokemons/sprites/129.png', 'pokemons/images/129.png', '{WATER}', '{"hp":20,"attack":10,"defense":55,"specialAttack":15,"specialDefense":20,"speed":80}'::json, 1),
(130, 'Léviator', 'pokemons/sprites/130.png', 'pokemons/images/130.png', '{WATER, FLYING}', '{"hp":95,"attack":125,"defense":79,"specialAttack":60,"specialDefense":100,"speed":81}'::json, 1),
(131, 'Lokhlass', 'pokemons/sprites/131.png', 'pokemons/images/131.png', '{WATER, ICE}', '{"hp":130,"attack":85,"defense":80,"specialAttack":85,"specialDefense":95,"speed":60}'::json, 1),
(132, 'Métamorph', 'pokemons/sprites/132.png', 'pokemons/images/132.png', '{NORMAL}', '{"hp":48,"attack":48,"defense":48,"specialAttack":48,"specialDefense":48,"speed":48}'::json, 1),
(133, 'Évoli', 'pokemons/sprites/133.png', 'pokemons/images/133.png', '{NORMAL}', '{"hp":55,"attack":55,"defense":50,"specialAttack":45,"specialDefense":65,"speed":55}'::json, 1),
(134, 'Aquali', 'pokemons/sprites/134.png', 'pokemons/images/134.png', '{WATER}', '{"hp":130,"attack":65,"defense":60,"specialAttack":110,"specialDefense":95,"speed":65}'::json, 1),
(135, 'Voltali', 'pokemons/sprites/135.png', 'pokemons/images/135.png', '{ELECTRIC}', '{"hp":65,"attack":65,"defense":60,"specialAttack":110,"specialDefense":95,"speed":130}'::json, 1),
(136, 'Pyroli', 'pokemons/sprites/136.png', 'pokemons/images/136.png', '{FIRE}', '{"hp":65,"attack":130,"defense":60,"specialAttack":95,"specialDefense":110,"speed":65}'::json, 1),
(137, 'Porygon', 'pokemons/sprites/137.png', 'pokemons/images/137.png', '{NORMAL}', '{"hp":65,"attack":60,"defense":70,"specialAttack":85,"specialDefense":75,"speed":40}'::json, 1),
(138, 'Amonita', 'pokemons/sprites/138.png', 'pokemons/images/138.png', '{ROCK, WATER}', '{"hp":35,"attack":40,"defense":100,"specialAttack":90,"specialDefense":55,"speed":35}'::json, 1),
(139, 'Amonistar', 'pokemons/sprites/139.png', 'pokemons/images/139.png', '{ROCK, WATER}', '{"hp":70,"attack":60,"defense":125,"specialAttack":115,"specialDefense":70,"speed":55}'::json, 1),
(140, 'Kabuto', 'pokemons/sprites/140.png', 'pokemons/images/140.png', '{ROCK, WATER}', '{"hp":30,"attack":80,"defense":90,"specialAttack":55,"specialDefense":45,"speed":55}'::json, 1),
(141, 'Kabutops', 'pokemons/sprites/141.png', 'pokemons/images/141.png', '{ROCK, WATER}', '{"hp":60,"attack":115,"defense":105,"specialAttack":65,"specialDefense":70,"speed":80}'::json, 1),
(142, 'Ptéra', 'pokemons/sprites/142.png', 'pokemons/images/142.png', '{ROCK, FLYING}', '{"hp":80,"attack":105,"defense":65,"specialAttack":60,"specialDefense":75,"speed":130}'::json, 1),
(143, 'Ronflex', 'pokemons/sprites/143.png', 'pokemons/images/143.png', '{NORMAL}', '{"hp":160,"attack":110,"defense":65,"specialAttack":65,"specialDefense":110,"speed":30}'::json, 1),
(144, 'Artikodin', 'pokemons/sprites/144.png', 'pokemons/images/144.png', '{ICE, FLYING}', '{"hp":90,"attack":85,"defense":100,"specialAttack":95,"specialDefense":125,"speed":85}'::json, 1),
(145, 'Électhor', 'pokemons/sprites/145.png', 'pokemons/images/145.png', '{ELECTRIC, FLYING}', '{"hp":90,"attack":90,"defense":85,"specialAttack":125,"specialDefense":90,"speed":100}'::json, 1),
(146, 'Sulfura', 'pokemons/sprites/146.png', 'pokemons/images/146.png', '{FIRE, FLYING}', '{"hp":90,"attack":100,"defense":90,"specialAttack":125,"specialDefense":85,"speed":90}'::json, 1),
(147, 'Minidraco', 'pokemons/sprites/147.png', 'pokemons/images/147.png', '{DRAGON}', '{"hp":41,"attack":64,"defense":45,"specialAttack":50,"specialDefense":50,"speed":50}'::json, 1),
(148, 'Draco', 'pokemons/sprites/148.png', 'pokemons/images/148.png', '{DRAGON}', '{"hp":61,"attack":84,"defense":65,"specialAttack":70,"specialDefense":70,"speed":70}'::json, 1),
(149, 'Dracolosse', 'pokemons/sprites/149.png', 'pokemons/images/149.png', '{DRAGON, FLYING}', '{"hp":91,"attack":134,"defense":95,"specialAttack":100,"specialDefense":100,"speed":80}'::json, 1),
(150, 'Mewtwo', 'pokemons/sprites/150.png', 'pokemons/images/150.png', '{PSYCHIC}', '{"hp":106,"attack":110,"defense":90,"specialAttack":154,"specialDefense":90,"speed":130}'::json, 1),
(151, 'Mew', 'pokemons/sprites/151.png', 'pokemons/images/151.png', '{PSYCHIC}', '{"hp":100,"attack":100,"defense":100,"specialAttack":100,"specialDefense":100,"speed":100}'::json, 1);

INSERT INTO "booster" ("name", "description", "price", "image_url") VALUES
('Scarlet & Violet Booster Pack', 'A booster pack from the Scarlet & Violet set.', 200, 'storage/booster/sv3_5.png');

INSERT INTO "set" ("name", "description", "release_date", "official_card_count", "total_card_count") VALUES
('Scarlet & Violet', 'The Scarlet & Violet set remakes the original 151 Pokémon 1st generation from the Kanto region.', '2023-03-01', 165, 207);

-- Lier le booster au set (table de jonction many-to-many)
INSERT INTO "_booster_sets" ("A", "B") VALUES
(1, 1);

INSERT INTO "card" ("set_id", "pokemon_id", "image_url", "rarity", "card_number") VALUES
/* Bulbizarre */
(1, 1, 'cards/sv3_5/001.png', 'COMMON', 1),
(1, 1, 'cards/sv3_5/166.png', 'ILLUSTRATION_RARE', 166),
/* Herbizarre */
(1, 2, 'cards/sv3_5/002.png', 'UNCOMMON', 2),
(1, 2, 'cards/sv3_5/167.png', 'ILLUSTRATION_RARE', 167),
/* Florizarre */
(1, 3, 'cards/sv3_5/003.png', 'DOUBLE_RARE', 3),
(1, 3, 'cards/sv3_5/182.png', 'ULTRA_RARE', 182),
(1, 3, 'cards/sv3_5/198.png', 'SPECIAL_ILLUSTRATION_RARE', 198),
/* Salamèche */
(1, 4, 'cards/sv3_5/004.png', 'COMMON', 4),
(1, 4, 'cards/sv3_5/168.png', 'ILLUSTRATION_RARE', 168),
/* Reptincel */
(1, 5, 'cards/sv3_5/005.png', 'UNCOMMON', 5),
(1, 5, 'cards/sv3_5/169.png', 'ILLUSTRATION_RARE', 169),
/* Dracaufeu */
(1, 6, 'cards/sv3_5/006.png', 'DOUBLE_RARE', 6),
(1, 6, 'cards/sv3_5/183.png', 'ULTRA_RARE', 183),
(1, 6, 'cards/sv3_5/199.png', 'SPECIAL_ILLUSTRATION_RARE', 199),
/* Carapuce */
(1, 7, 'cards/sv3_5/007.png', 'COMMON', 7),
(1, 7, 'cards/sv3_5/170.png', 'ILLUSTRATION_RARE', 170),
/* Carabaffe */
(1, 8, 'cards/sv3_5/008.png', 'UNCOMMON', 8),
(1, 8, 'cards/sv3_5/171.png', 'ILLUSTRATION_RARE', 171),
/* Tortank */
(1, 9, 'cards/sv3_5/009.png', 'DOUBLE_RARE', 9),
(1, 9, 'cards/sv3_5/184.png', 'ULTRA_RARE', 184),
(1, 9, 'cards/sv3_5/200.png', 'SPECIAL_ILLUSTRATION_RARE', 200),
/* Chenipan */
(1, 10, 'cards/sv3_5/010.png', 'COMMON', 10),
(1, 10, 'cards/sv3_5/172.png', 'ILLUSTRATION_RARE', 172),
/* Chrysacier */
(1, 11, 'cards/sv3_5/011.png', 'COMMON', 11),
(1, 12, 'cards/sv3_5/012.png', 'UNCOMMON', 12),
(1, 13, 'cards/sv3_5/013.png', 'COMMON', 13),
(1, 14, 'cards/sv3_5/014.png', 'COMMON', 14),
(1, 15, 'cards/sv3_5/015.png', 'RARE', 15),
(1, 16, 'cards/sv3_5/016.png', 'COMMON', 16),
(1, 17, 'cards/sv3_5/017.png', 'COMMON', 17),
(1, 18, 'cards/sv3_5/018.png', 'UNCOMMON', 18),
(1, 19, 'cards/sv3_5/019.png', 'COMMON', 19),
(1, 20, 'cards/sv3_5/020.png', 'UNCOMMON', 20),
(1, 21, 'cards/sv3_5/021.png', 'COMMON', 21),
(1, 22, 'cards/sv3_5/022.png', 'UNCOMMON', 22),
(1, 23, 'cards/sv3_5/023.png', 'COMMON', 23),
/* Arbok */
(1, 24, 'cards/sv3_5/024.png', 'DOUBLE_RARE', 24),
(1, 24, 'cards/sv3_5/185.png', 'ULTRA_RARE', 185),
/* Pikachu */
(1, 25, 'cards/sv3_5/025.png', 'COMMON', 25),
(1, 25, 'cards/sv3_5/173.png', 'ILLUSTRATION_RARE', 173),

(1, 26, 'cards/sv3_5/026.png', 'RARE', 26),
(1, 27, 'cards/sv3_5/027.png', 'COMMON', 27),
(1, 28, 'cards/sv3_5/028.png', 'UNCOMMON', 28),
(1, 29, 'cards/sv3_5/029.png', 'COMMON', 29),
(1, 30, 'cards/sv3_5/030.png', 'UNCOMMON', 30),
(1, 31, 'cards/sv3_5/031.png', 'UNCOMMON', 31),
(1, 32, 'cards/sv3_5/032.png', 'COMMON', 32),
(1, 33, 'cards/sv3_5/033.png', 'UNCOMMON', 33),
/* Nidoking */
(1, 34, 'cards/sv3_5/034.png', 'RARE', 34),
(1, 34, 'cards/sv3_5/174.png', 'ILLUSTRATION_RARE', 174),

(1, 35, 'cards/sv3_5/035.png', 'COMMON', 35),
(1, 36, 'cards/sv3_5/036.png', 'UNCOMMON', 36),
(1, 37, 'cards/sv3_5/037.png', 'COMMON', 37),
/* Feunard */
(1, 38, 'cards/sv3_5/038.png', 'DOUBLE_RARE', 38),
(1, 38, 'cards/sv3_5/186.png', 'ULTRA_RARE', 186),

(1, 39, 'cards/sv3_5/039.png', 'COMMON', 39),
/* Grodoudou */
(1, 40, 'cards/sv3_5/040.png', 'DOUBLE_RARE', 40),
(1, 40, 'cards/sv3_5/187.png', 'ULTRA_RARE', 187),

(1, 41, 'cards/sv3_5/041.png', 'COMMON', 41),
(1, 42, 'cards/sv3_5/042.png', 'UNCOMMON', 42),
(1, 43, 'cards/sv3_5/043.png', 'COMMON', 43),
(1, 44, 'cards/sv3_5/044.png', 'UNCOMMON', 44),
(1, 45, 'cards/sv3_5/045.png', 'RARE', 45),
(1, 46, 'cards/sv3_5/046.png', 'COMMON', 46),
(1, 47, 'cards/sv3_5/047.png', 'UNCOMMON', 47),
(1, 48, 'cards/sv3_5/048.png', 'COMMON', 48),
(1, 49, 'cards/sv3_5/049.png', 'UNCOMMON', 49),
(1, 50, 'cards/sv3_5/050.png', 'COMMON', 50),
(1, 51, 'cards/sv3_5/051.png', 'UNCOMMON', 51),
(1, 52, 'cards/sv3_5/052.png', 'COMMON', 52),
(1, 53, 'cards/sv3_5/053.png', 'UNCOMMON', 53),
/* Psykokwak */
(1, 54, 'cards/sv3_5/054.png', 'COMMON', 54),
(1, 54, 'cards/sv3_5/175.png', 'ILLUSTRATION_RARE', 175),

(1, 55, 'cards/sv3_5/055.png', 'UNCOMMON', 55),
(1, 56, 'cards/sv3_5/056.png', 'COMMON', 56),
(1, 57, 'cards/sv3_5/057.png', 'UNCOMMON', 57),
(1, 58, 'cards/sv3_5/058.png', 'COMMON', 58),
(1, 59, 'cards/sv3_5/059.png', 'UNCOMMON', 59),
(1, 60, 'cards/sv3_5/060.png', 'COMMON', 60),
/* Tétarte */
(1, 61, 'cards/sv3_5/061.png', 'COMMON', 61),
(1, 61, 'cards/sv3_5/176.png', 'ILLUSTRATION_RARE', 176),

(1, 62, 'cards/sv3_5/062.png', 'UNCOMMON', 62),
(1, 63, 'cards/sv3_5/063.png', 'COMMON', 63),
(1, 64, 'cards/sv3_5/064.png', 'UNCOMMON', 64),
/* Alakazam */
(1, 65, 'cards/sv3_5/065.png', 'DOUBLE_RARE', 65),
(1, 65, 'cards/sv3_5/188.png', 'ULTRA_RARE', 188),
(1, 65, 'cards/sv3_5/201.png', 'SPECIAL_ILLUSTRATION_RARE', 201),

(1, 66, 'cards/sv3_5/066.png', 'COMMON', 66),
/* Machopeur */
(1, 67, 'cards/sv3_5/067.png', 'UNCOMMON', 67),
(1, 67, 'cards/sv3_5/177.png', 'ILLUSTRATION_RARE', 177),

(1, 68, 'cards/sv3_5/068.png', 'RARE', 68),
(1, 69, 'cards/sv3_5/069.png', 'COMMON', 69),
(1, 70, 'cards/sv3_5/070.png', 'COMMON', 70),
(1, 71, 'cards/sv3_5/071.png', 'UNCOMMON', 71),
(1, 72, 'cards/sv3_5/072.png', 'COMMON', 72),
(1, 73, 'cards/sv3_5/073.png', 'UNCOMMON', 73),
(1, 74, 'cards/sv3_5/074.png', 'COMMON', 74),
(1, 75, 'cards/sv3_5/075.png', 'UNCOMMON', 75),
/* Grolem */
(1, 76, 'cards/sv3_5/076.png', 'DOUBLE_RARE', 76),
(1, 76, 'cards/sv3_5/189.png', 'ULTRA_RARE', 189),

(1, 77, 'cards/sv3_5/077.png', 'COMMON', 77),
(1, 78, 'cards/sv3_5/078.png', 'UNCOMMON', 78),
(1, 79, 'cards/sv3_5/079.png', 'COMMON', 79),
(1, 80, 'cards/sv3_5/080.png', 'UNCOMMON', 80),
(1, 81, 'cards/sv3_5/081.png', 'COMMON', 81),
(1, 82, 'cards/sv3_5/082.png', 'UNCOMMON', 82),
(1, 83, 'cards/sv3_5/083.png', 'COMMON', 83),
(1, 84, 'cards/sv3_5/084.png', 'COMMON', 84),
(1, 85, 'cards/sv3_5/085.png', 'RARE', 85),
(1, 86, 'cards/sv3_5/086.png', 'COMMON', 86),
(1, 87, 'cards/sv3_5/087.png', 'UNCOMMON', 87),
(1, 88, 'cards/sv3_5/088.png', 'COMMON', 88),
(1, 89, 'cards/sv3_5/089.png', 'UNCOMMON', 89),
(1, 90, 'cards/sv3_5/090.png', 'COMMON', 90),
(1, 91, 'cards/sv3_5/091.png', 'UNCOMMON', 91),
(1, 92, 'cards/sv3_5/092.png', 'COMMON', 92),
(1, 93, 'cards/sv3_5/093.png', 'UNCOMMON', 93),
(1, 94, 'cards/sv3_5/094.png', 'RARE', 94),
(1, 95, 'cards/sv3_5/095.png', 'UNCOMMON', 95),
(1, 96, 'cards/sv3_5/096.png', 'COMMON', 96),
(1, 97, 'cards/sv3_5/097.png', 'UNCOMMON', 97),
(1, 98, 'cards/sv3_5/098.png', 'COMMON', 98),
(1, 99, 'cards/sv3_5/099.png', 'UNCOMMON', 99),
(1, 100, 'cards/sv3_5/100.png', 'COMMON', 100),
(1, 101, 'cards/sv3_5/101.png', 'RARE', 101),
(1, 102, 'cards/sv3_5/102.png', 'COMMON', 102),
(1, 103, 'cards/sv3_5/103.png', 'UNCOMMON', 103),
(1, 104, 'cards/sv3_5/104.png', 'COMMON', 104),
(1, 105, 'cards/sv3_5/105.png', 'RARE', 105),


(1, 106, 'cards/sv3_5/106.png', 'UNCOMMON', 106),
(1, 107, 'cards/sv3_5/107.png', 'UNCOMMON', 107),
(1, 108, 'cards/sv3_5/108.png', 'COMMON', 108),
(1, 109, 'cards/sv3_5/109.png', 'COMMON', 109),
(1, 110, 'cards/sv3_5/110.png', 'RARE', 110),
(1, 111, 'cards/sv3_5/111.png', 'COMMON', 111),
(1, 112, 'cards/sv3_5/112.png', 'UNCOMMON', 112),
(1, 113, 'cards/sv3_5/113.png', 'RARE', 113),
/* Saquedeneu */
(1, 114, 'cards/sv3_5/114.png', 'COMMON', 114),
(1, 114, 'cards/sv3_5/178.png', 'ILLUSTRATION_RARE', 178),
/* Kangourex */
(1, 115, 'cards/sv3_5/115.png', 'DOUBLE_RARE', 115),
(1, 115, 'cards/sv3_5/190.png', 'ULTRA_RARE', 190),

(1, 116, 'cards/sv3_5/116.png', 'COMMON', 116),
(1, 117, 'cards/sv3_5/117.png', 'UNCOMMON', 117),
(1, 118, 'cards/sv3_5/118.png', 'COMMON', 118),
(1, 119, 'cards/sv3_5/119.png', 'UNCOMMON', 119),
(1, 120, 'cards/sv3_5/120.png', 'COMMON', 120),
(1, 121, 'cards/sv3_5/121.png', 'RARE', 121),
/* M.Mime */
(1, 122, 'cards/sv3_5/122.png', 'RARE', 122),
(1, 122, 'cards/sv3_5/179.png', 'ILLUSTRATION_RARE', 179),

(1, 123, 'cards/sv3_5/123.png', 'UNCOMMON', 123),
/* Lippoutou */
(1, 124, 'cards/sv3_5/124.png', 'DOUBLE_RARE', 124),
(1, 124, 'cards/sv3_5/191.png', 'ULTRA_RARE', 191),

(1, 125, 'cards/sv3_5/125.png', 'COMMON', 125),
(1, 126, 'cards/sv3_5/126.png', 'COMMON', 126),
(1, 127, 'cards/sv3_5/127.png', 'UNCOMMON', 127),
(1, 128, 'cards/sv3_5/128.png', 'UNCOMMON', 128),
(1, 129, 'cards/sv3_5/129.png', 'COMMON', 129),
(1, 130, 'cards/sv3_5/130.png', 'RARE', 130),
(1, 131, 'cards/sv3_5/131.png', 'UNCOMMON', 131),
(1, 132, 'cards/sv3_5/132.png', 'RARE', 132),
(1, 133, 'cards/sv3_5/133.png', 'COMMON', 133),
(1, 134, 'cards/sv3_5/134.png', 'RARE', 134),
(1, 135, 'cards/sv3_5/135.png', 'RARE', 135),
(1, 136, 'cards/sv3_5/136.png', 'RARE', 136),
(1, 137, 'cards/sv3_5/137.png', 'COMMON', 137),
/* Amonita */
(1, 138, 'cards/sv3_5/138.png', 'UNCOMMON', 138),
(1, 138, 'cards/sv3_5/180.png', 'ILLUSTRATION_RARE', 180),

(1, 139, 'cards/sv3_5/139.png', 'RARE', 139),
(1, 140, 'cards/sv3_5/140.png', 'UNCOMMON', 140),
(1, 141, 'cards/sv3_5/141.png', 'RARE', 141),
(1, 142, 'cards/sv3_5/142.png', 'RARE', 142),
(1, 143, 'cards/sv3_5/143.png', 'UNCOMMON', 143),
(1, 144, 'cards/sv3_5/144.png', 'RARE', 144),
/* Électhor */
(1, 145, 'cards/sv3_5/145.png', 'DOUBLE_RARE', 145),
(1, 145, 'cards/sv3_5/192.png', 'ULTRA_RARE', 192),
(1, 145, 'cards/sv3_5/202.png', 'SPECIAL_ILLUSTRATION_RARE', 202),

(1, 146, 'cards/sv3_5/146.png', 'RARE', 146),
(1, 147, 'cards/sv3_5/147.png', 'COMMON', 147),
/* Draco */
(1, 148, 'cards/sv3_5/148.png', 'UNCOMMON', 148),
(1, 148, 'cards/sv3_5/181.png', 'ILLUSTRATION_RARE', 181),

(1, 149, 'cards/sv3_5/149.png', 'RARE', 149),
(1, 150, 'cards/sv3_5/150.png', 'RARE', 150),
/* Mew */
(1, 151, 'cards/sv3_5/151.png', 'DOUBLE_RARE', 151),
(1, 151, 'cards/sv3_5/193.png', 'ULTRA_RARE', 193),
(1, 151, 'cards/sv3_5/205.png', 'HYPER_RARE', 205);

-- Cartes trouvees par Flav
INSERT INTO "card_owned" ("user_id", "card_id", "quantity")
SELECT
    selected_cards.user_id,
    c.id,
    selected_cards.quantity
FROM (
    VALUES
        (3, 4, 1),
        (3, 168, 1),
        (3, 6, 1),
        (3, 25, 2),
        (3, 186, 1),
        (3, 92, 1),
        (3, 94, 1),
        (3, 193, 1)
) AS selected_cards(user_id, card_number, quantity)
JOIN "card" c 
    ON c.card_number = selected_cards.card_number;