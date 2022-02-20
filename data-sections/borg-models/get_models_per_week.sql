SELECT
    FLOOR(DATEDIFF(NOW(), datetime) / 7) AS week,
    JSON_EXTRACT(json, '$.data') AS models
FROM
    feedback
WHERE
    key_name = 'cyborg_modules'
        AND datetime > DATE(NOW() - INTERVAL 120 DAY)
ORDER BY id DESC