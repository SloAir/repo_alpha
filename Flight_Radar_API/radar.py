from FlightRadar24.api import FlightRadar24API
import json

fr = FlightRadar24API()

airports = fr.get_airports()
flights = fr.get_flights()

json_airports = json.dumps(airports)
#json_flights = json.dumps(flights)

airports_dump = json.loads(json_airports)
#flights_dump = json.loads(json_flights)

filtered_airports = []
filtered_flights = []

for d in airports_dump:
     if d["country"] == "Slovenia":
          filtered_airports.append(d)

count = 0
for d in flights:
     # print(d)
     count += 1

zones = fr.get_zones()
json_zones = json.dumps(zones)
zones_dump = json.loads(json_zones)
filtered_zones = []

for z in zones_dump:
     print(z)

print(zones["europe"])

f_airports = open("airports.txt", "w")
# for d in filtered_airports:
     # f_airports.write(d)

bounds = fr.get_bounds(zones["europe"]["subzones"]["ceur"])
si_bounds = "47.11,12.49,44.66,17.63"

# europe_flights = fr.get_flights(bounds = si_bounds)
europe_flights = fr.get_flights(bounds = si_bounds)

f_eu_flights = open("eu_flights.txt", "w")
i = 0
for f in europe_flights:
     details = fr.get_flight_details(f.id)
     f_eu_flights.write(str(details) + '\n')
     i += 1

# details = fr.get_flight_details(flight.id)

# keys = details.keys()

# print(keys)

# for d in keys:

  # f_eu_flights.write(d + ": " + str(details[d]) + '\n')
     