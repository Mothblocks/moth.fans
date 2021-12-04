SELECT round, threatlevel, (
    SELECT STRING_AGG(DISTINCT rulesetchosen, ';')
    FROM public.dynamic_snapshot
    WHERE header = public.dynamic_header.id
) AS rulesets, (endtime - starttime) AS roundlength, (
    SELECT called
    FROM public.shuttle_call
    WHERE round = public.round.id
    ORDER BY id ASC
    LIMIT 1
) - public.round.starttime AS first_shuttle_call_time, round.starttime, display AS server
FROM public.dynamic_header
INNER JOIN public.round ON public.round.id = public.dynamic_header.round
INNER JOIN public.server ON public.server.id = public.round.server
WHERE round.starttime >= NOW() - INTERVAL '30 DAY'
ORDER BY public.dynamic_header.round DESC
