import os

images = [
    'rtf', 'guk', 'fti', 'mt',
    'hti', 'isa', 'guk', 'guk',
    'tpf', 'nin', 'ugi', 'matmeh'
    ]

for index, path in enumerate(images):
    walk = list(os.walk(f'src/{path}'))[0]
    images[index] = sorted([f'{walk[0]}/{i}' for i in walk[2]])
print(images)
