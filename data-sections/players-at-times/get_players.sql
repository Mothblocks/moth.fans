SELECT
    EXTRACT(HOUR FROM round.game_start_time) AS hour,
    server.display AS server,
    COUNT(*) AS players
FROM
    public.round_player
    INNER JOIN round ON round.id = round_player.round
    INNER JOIN SERVER ON server.id = round.server
WHERE
    round.game_start_time >= NOW() - INTERVAL '30' DAY
GROUP BY
    round.id,
    server.display
ORDER BY
    round.id DESC
