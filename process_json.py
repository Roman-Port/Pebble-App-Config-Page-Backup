#!/usr/bin/env python
# -*- coding: ascii -*-
# vim:ts=4:sw=4:softtabstop=4:smarttab:expandtab
#

import json
import sys
import warnings
import logging

# static, hard coded list of split json files in-order
fnames = """output.json.000
output.json.001
output.json.002
output.json.003
output.json.004
"""

# join split files in-memory!
data = []
for filename in [x.strip() for x in fnames.split('\n') if x and x.strip()]:
    f = open(filename, 'rb')
    data.append(f.read())
    #log.info('read complete, len %r', len(data))
    f.close()
data = json.loads(b''.join(data))

"""
filename = 'pretty_catalog.json'
#log.info('filename %r', filename)
f = open(filename, 'rb')
data = f.read()
#log.info('read complete, len %r', len(data))
f.close()

data = json.loads(data)
"""

#print(json.dumps(data, indent=4)[:300])  # extract
#print(json.dumps(data, indent=4))  # full thing

for app in data:
    appid = app['appid']
    base_url = app['base_url']
    urls = [base_url]

    print(appid)
    # TODO connect to app store and get; name (title), author, website, source code url (source), PBW url (pbw_file), description, uuid?
    # https://appstore-api.rebble.io/api/v1/apps/id/APPID
    if base_url:
        if base_url.startswith('data:'):
            print('data URL - likely Clay or custom built in')
        else:
            print('%s' % base_url)
    else:
        print('no_config')
    for platform_name in app['platforms']:
        # go through each platforms and check if base_url is different
        if app['platforms'][platform_name]['base_url'] != base_url:
            urls.append(app['platforms'][platform_name]['base_url'])
            print('%s_url different from base' % (platform_name, ))
    print('')

    
