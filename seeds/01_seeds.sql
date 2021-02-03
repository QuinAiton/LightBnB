-- USER SEEDS
INSERT INTO users(name, email, password)
VALUES('Billy Bob', 'billy@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO users(name, email, password)
VALUES('Aran bells', 'AronDaMON@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO users(name, email, password)
VALUES('Cindy Mindy', 'Mindy_bindy@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

-- Properties seeds
INSERT INTO properties(owner_id,title,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES(1,'The Big House','https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',800,2,3,5,'Canada','101 Island Highway','Victoria','BC', 'v9n3m9', TRUE);

INSERT INTO properties(owner_id,title,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES(3,'Cool House','https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',400,5,2,4,'Balgaria','big whale st','palm','AC', 'v9dfm9', TRUE);

INSERT INTO properties(owner_id,title,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES(1,'Wavy Place','https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',10000,5,12,8,'United States','101 Beach Drive','California','CA', 'v9er3m9', TRUE);

-- reservations
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('1987-04-03', '2000-02-05',1,2);

INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('1990-06-03', '2000-05-05',3,1);

INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2010-07-03', '2020-01-05',2,1);

-- property_reviews
INSERT INTO property_reviews(guest_id,property_id,
reservation_id,rating,message)
VALUES(2,1,1,5,'I LIKE');

INSERT INTO property_reviews(guest_id,property_id,
reservation_id,rating,message)
VALUES(1,3,2,5,'poopoo place');

INSERT INTO property_reviews(guest_id,property_id,
reservation_id,rating,message)
VALUES(1,2,3,5,'DIS DOPPPEE');