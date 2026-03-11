<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

<xsl:template match="/">

<html>
<head>
    <title>XML Sitemap</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background: #f9f9f9;
        }

        h1 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        th, td {
            border: 1px solid #ccc;
            padding: 8px 12px;
            font-size: 14px;
            text-align: left;
        }

        th {
            background: #f0f0f0;
        }

        a {
            color: #1a0dab;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>

<h1>Google Image Sitemap</h1>

<table>
    <tr>
        <th>URL</th>
        <th>Image URL</th>
        <th>Last modification date</th>
    </tr>

    <!-- Loop through each URL -->
    <xsl:for-each select="sitemap:urlset/sitemap:url">
        <tr>
            <td>
                <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                </a>
            </td>

            <td>
                <!-- Loop through images inside <image:image> -->
                <xsl:for-each select="image:image">
                    <a href="{image:loc}">
                        <xsl:value-of select="image:loc"/>
                    </a>
                    <br/>
                </xsl:for-each>
            </td>

            <td>
                <xsl:value-of select="sitemap:lastmod"/>
            </td>
        </tr>
    </xsl:for-each>

</table>

</body>
</html>

</xsl:template>

</xsl:stylesheet>