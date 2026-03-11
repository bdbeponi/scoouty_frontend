<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:template match="/">

<html>
<head>
<title>XML Sitemap</title>

<style>
body{
font-family:Arial;
margin:40px;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #ccc;
padding:8px;
font-size:14px;
}

th{
background:#f5f5f5;
}

a{
color:#1a0dab;
text-decoration:none;
}

</style>

</head>

<body>

<h1>Google Sitemap..</h1>

<table>

<tr>
<th>URL</th>
<th>Last Modified</th>
<th>Change Frequency</th>
<th>Priority</th>
</tr>

<xsl:for-each select="sitemap:urlset/sitemap:url">

<tr>
<td>
<a href="{sitemap:loc}">
<xsl:value-of select="sitemap:loc"/>
</a>
</td>

<td>
<xsl:value-of select="sitemap:lastmod"/>
</td>

<td>
<xsl:value-of select="sitemap:changefreq"/>
</td>

<td>
<xsl:value-of select="sitemap:priority"/>
</td>

</tr>

</xsl:for-each>

</table>

</body>

</html>

</xsl:template>

</xsl:stylesheet>