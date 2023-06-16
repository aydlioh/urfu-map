from server_params import host, port


def format_data(data: list[dict]):
    for obj in data:
        obj['groundFloor'] = bool(obj['groundFloor'])
        obj['door'] = list(map(float, obj['door'].split(',')))
        obj['position'] = list(map(float, obj['position'].split(',')))
        obj['institute'] = [f'http://{host}:{port}/institutes/{obj["id"]}/{i}' for i in range(1, obj['institute'] + 1)]
    return data
