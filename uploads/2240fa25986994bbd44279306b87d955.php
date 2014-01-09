<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
// define('DB_USER', 'esklein');
define('DB_USER', 'root');

/** MySQL database password */
// define('DB_PASSWORD', 'Roandrowat1');
define('DB_PASSWORD', 'root');

/** MySQL hostname */
// define('DB_HOST', 'wordpress.cyglrydphxbg.us-east-1.rds.amazonaws.com');
define('DB_HOST', 'localhost');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '{azwC|#5F::(A;+/lw-#XfQnGb|GGMc~3=#!7(egcI=[J(/ZeTf3[NEEIyAiE`k1');
define('SECURE_AUTH_KEY',  '7aT3J;iUno(*rOJi<jm6v@cXvT8F2 -Y+^D~1PHk=tZfP}PjN.A<ET4_P5j;e>3(');
define('LOGGED_IN_KEY',    '3,C$l|[^1wRQkXN&0hX(Kvk#/($-SuGMjjYwSRwZd}MxY2cu:gs=mzxdTa--CDb:');
define('NONCE_KEY',        'SJoqErC-t@WWh^B0H%&gW;2fL*f9JPHSM:&YIIM,bILm]AzFLm/%(- *,;C*i(Vo');
define('AUTH_SALT',        '@Si2I1+BzdAod!^KaXc!;_T7JIhnb-=l_+F</iRc`L[;D?2;zrq#!`c#KI&`ez@Q');
define('SECURE_AUTH_SALT', 'lm*!Kt:QlRFn$n}`vrgp^4>*_eISN@]MAO-O}R>;==LGKRIB`_(]Y`XDfPL9`<nu');
define('LOGGED_IN_SALT',   'x$ck&Q$p(bG}~a<T0#+<j?VKtgU5/Jm#SvE$!VbY2var>4]&r)%PCdBMRySU;TB5');
define('NONCE_SALT',       'FOk]|P{lA]Up)D</Z.2}#*:TUYp8ju4s&LZSn]bi%A$!=&3}F@5]Ek>JJ-SyP4Qm');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
