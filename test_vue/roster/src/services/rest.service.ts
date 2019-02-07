import { Player, playersMapper, playerBuilder } from '@/model/player.model';

const BASE_URL = 'http://localhost:5000/api/';

const init = {
    method: 'PUT',
    headers: new Headers()
};

function getPlayers(path: string): Promise<Player[]> {
    return fetch(BASE_URL + path)
        .then((response: Response) => response.json())
        .then((playerz: any) => playersMapper(playerz.content));
}

export class RestService {

    public static getRoster(): Promise<Player[]> {
        return getPlayers('roster');
    }

    public static getQuintet(): Promise<Player[]> {
        return getPlayers('roster?bench=false');
    }

    public static getBenchwarmers(): Promise<Player[]> {
        return getPlayers('roster?bench=true');
    }

    public static swap(from: number, to: number): Promise<Player[]> {
        let url = BASE_URL + 'quintet?pull=' + from + '&push=' + to;
        return fetch(url,init)
                .then((response: Response) => response.json())
                .then((playerz: any) => playersMapper(playerz.content));
    }

    public static getPlayer(num: number): Promise<Player> {
        return fetch(BASE_URL + String(num))
                .then((response: Response) => response.json())
                .then((player: any) => playerBuilder(player));
    }

}
