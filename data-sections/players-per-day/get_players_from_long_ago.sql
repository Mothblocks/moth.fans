SELECT
    COUNT(DISTINCT ckey) AS count,
    server_port,
    DATE(datetime) AS date
FROM
    connection_log
WHERE
    datetime >= NOW() - INTERVAL (365 + 150) DAY
        AND datetime < NOW() - INTERVAL 365 DAY
GROUP BY server_port , DATE(datetime)
ORDER BY id DESC
