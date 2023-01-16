INSERT INTO rates (id, rate, vehicle_id, user_id, creation_date)
VALUES  (1, 4, 1, 1, '2015-02-12T06:12:12'),
        (2, 3, 1, 2, '2014-04-23T08:23:23'),
        (3, 2, 1, 4, '2013-08-22T05:33:34'),
        (4, 3, 1, 3, '2012-07-12T07:22:45'),
        (5, 4, 2, 1, '2011-02-13T08:43:36'),
        (6, 5, 2, 2, '2012-03-14T07:12:25'),
        (7, 5, 2, 3, '2013-04-15T06:50:04'),
        (8, 5, 2, 4, '2014-02-16T05:33:11'),
        (9, 3, 2, 5, '2015-03-17T04:22:22'),
        (10, 2, 3, 1, '2016-10-18T03:43:54'),
        (11, 3, 3, 2, '2017-11-19T02:22:23'),
        (12, 4, 3, 3, '2018-12-18T03:23:34'),
        (13, 5, 4, 1, '2015-02-12T06:12:12'),
        (14, 4, 5, 2, '2014-04-23T08:23:23'),
        (15, 3, 6, 3, '2015-05-16T05:50:06'),
        (16, 4, 7, 4, '2015-05-16T05:50:06'),
        (17, 5, 8, 5, '2015-05-16T05:50:06'),
        (18, 5, 8, 3, '2015-05-16T05:50:06'),
        (19, 2, 1, 1, '2014-03-17T05:50:06'),
        (20, 3, 2, 2, '2013-02-18T02:56:16'),
        (21, 4, 3, 3, '2012-05-19T03:55:25'),
        (22, 5, 4, 4, '2011-01-26T04:54:34'),
        (23, 4, 5, 3, '2012-02-21T05:53:43'),
        (24, 3, 6, 2, '2012-03-22T06:52:52'),
        (25, 2, 7, 1, '2013-04-23T07:51:41');

INSERT INTO comments (id, content, vehicle_id, user_id, creation_date, rate_id)
VALUES (1, 'Lorem ipsum 1', 1, 1, '2015-02-12T06:12:12', 1),
       (2, 'Lorem ipsum 2', 1, 1, '2014-04-23T08:23:23', 2),
       (3, 'Lorem ipsum 3', 1, 2, '2013-08-22T05:33:34', 3),
       (4, 'Lorem ipsum 4', 2, 3, '2012-07-12T07:22:45', 4),
       (5, 'Lorem ipsum 5', 3, 4, '2011-02-13T08:43:36', 5),
       (6, 'Lorem ipsum 6', 3, 2, '2012-03-14T07:12:25', 6),
       (7, 'Lorem ipsum 7', 2, 1, '2013-04-15T06:50:04', 7),
       (8, 'Lorem ipsum 8', 2, 3, '2014-02-16T05:33:11', 8),
       (9, 'Lorem ipsum 9', 2, 2, '2015-03-17T04:22:22', 9),
       (10, 'Lorem ipsum 10', 3, 5, '2016-10-18T03:43:54', 10),
       (11, 'Lorem ipsum 11', 5, 4, '2017-11-19T02:22:23', 11),
       (12, 'Lorem ipsum 12', 4, 3, '2018-12-18T03:23:34', 12),
       (13, 'Lorem ipsum 13', 3, 1, '2019-05-17T04:11:54', 13),
       (14, 'Lorem ipsum 14', 2, 3, '2018-06-16T05:54:43', 14),
       (15, 'Lorem ipsum 15', 1, 2, '2017-07-15T06:34:32', 15),
       (16, 'Lorem ipsum 16', 1, 1, '2016-08-14T07:33:34', 16),
       (17, 'Lorem ipsum 17', 1, 2, '2015-09-13T08:23:12', 17),
       (18, 'Lorem ipsum 18', 2, 2, '2014-08-12T09:54:43', 18),
       (19, 'Lorem ipsum 19', 2, 1, '2013-07-11T08:50:34', 19),
       (20, 'Lorem ipsum 20', 3, 2, '2012-06-12T07:23:22', 20),
       (21, 'Lorem ipsum 21', 3, 2, '2011-05-13T06:32:23', 21),
       (22, 'Lorem ipsum 22', 5, 3, '2012-04-14T05:15:43', 22),
       (23, 'Lorem ipsum 23', 4, 2, '2013-03-11T04:17:22', 23),
       (24, 'Lorem ipsum 24', 3, 4, '2014-02-16T03:26:23', 24),
       (25, 'Lorem ipsum 25', 2, 5, '2015-01-17T05:45:12', 25);