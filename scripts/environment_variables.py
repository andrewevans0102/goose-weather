import sys

# environment.ts
with open('src/environments/environment.ts', 'r') as file :
  filedata = file.read()

filedata = filedata.replace('OPEN_WEATHER_MAP_API_KEY', sys.argv[1])

with open('src/environments/environment.ts', 'w') as file:
  file.write(filedata)

# environment.prod.ts
with open('src/environments/environment.prod.ts', 'r') as file :
  filedata = file.read()

filedata = filedata.replace('OPEN_WEATHER_MAP_API_KEY', sys.argv[1])

with open('src/environments/environment.prod.ts', 'w') as file:
  file.write(filedata)
