import csv
from MakeRandomIPv6Address import random_ipv6_addr
import csv
from MakeRandomIPv6Address import random_ipv6_addr


def random_ipv6_addr_to_csv(network):
    addresses = []
    for i in range(50):
        addresses.append(random_ipv6_addr("fd66:6cbb:8c10::/48"))
    print(addresses)
    with open('./generated_ipv6_lel.csv', 'w', newline='') as csvfile:
        spamwriter = csv.writer(csvfile, delimiter='\n',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
        spamwriter.writerow(addresses)

    
random_ipv6_addr_to_csv("fd66:6cbb:8c10::/48")
