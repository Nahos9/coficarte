SELECT
    'REVOKE ALL PRIVILEGES ON '
    || TABLE_NAME
    || ' FROM COFINA_CREDIT;'
FROM
    USER_TABLES;

exit;