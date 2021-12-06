SELECT
    DATE(firstseen) AS date, round.server_port AS port
FROM
    player
        INNER JOIN
    round ON round.id = player.firstseen_round_id
WHERE
    firstseen > DATE(NOW() - INTERVAL 120 DAY)
ORDER BY firstseen DESC
