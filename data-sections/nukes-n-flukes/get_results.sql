SELECT
    server_port AS server,
    months_ago,
    declared_war,
    nuked,
    COUNT(*) AS count
FROM
    (SELECT
        game_mode_result,
            server_port,
            FLOOR(DATEDIFF(NOW(), initialize_datetime) / 30) AS months_ago,
            feedback.json IS NOT NULL AS declared_war,
            (game_mode_result = 'win - syndicate nuke'
                OR game_mode_result = 'halfwin - syndicate nuke - did not evacuate in time') AS nuked
    FROM
        round
	LEFT JOIN feedback ON feedback.round_id = round.id AND key_name = 'nuclear_challenge_mode'
    WHERE
        (game_mode_result = 'loss - syndicate nuked - disk secured'
            OR game_mode_result = 'win - syndicate nuke'
            OR game_mode_result = 'halfwin - syndicate nuke - did not evacuate in time'
            OR game_mode_result = 'halfwin - blew wrong station'
            OR game_mode_result = 'halfwin - blew wrong station - did not evacuate in time'
            OR game_mode_result = 'loss - evacuation - disk secured - syndi team dead'
            OR game_mode_result = 'loss - evacuation - disk secured'
            OR game_mode_result = 'halfwin - evacuation - disk not secured'
            OR game_mode_result = 'halfwin - detonation averted'
            OR game_mode_result = 'halfwin - interrupted')
            AND initialize_datetime >= (NOW() - INTERVAL 6 MONTH)
    ORDER BY round.id DESC) t
GROUP BY server_port , months_ago , declared_war , nuked

