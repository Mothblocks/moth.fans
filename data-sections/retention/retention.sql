SELECT
    days_since_first, COUNT(*) AS count
FROM
    (SELECT
        DATEDIFF(connection_log.datetime, player.firstseen) AS days_since_first
    FROM
        connection_log
    INNER JOIN player ON player.ckey = connection_log.ckey
    WHERE
        datetime > DATE(NOW() - INTERVAL 90 DAY)
            AND DATEDIFF(connection_log.datetime, player.firstseen) < 30
    GROUP BY player.ckey , days_since_first) t
GROUP BY days_since_first
