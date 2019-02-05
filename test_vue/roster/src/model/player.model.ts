export class Player {

    public num: number;
    public quintet: boolean;
    public jersey: string;
    public player: string;
    public pos: string;
    public ht: number;
    public wt: number;
    public birthdate: Date;
    public nat: string;
    public exp: string;
    public college: string|null;

    constructor(
        num: number,
        quintet: string,
        jersey: string,
        player: string,
        pos: string,
        ht: number,
        wt: number,
        birthdate: Date,
        nat: string,
        exp: number,
        college?: string,
    ) {
        this.num = num;
        this.quintet = quintet === 'true';
        this.jersey = jersey;
        this.player = player;
        this.pos = pos;
        this.ht = ht;
        this.wt = wt;
        this.birthdate = new Date(birthdate);
        this.nat = nat;
        this.exp = exp === 0 ? 'Rookie' : String(exp);
        this.college = Boolean(college) ? String(college) : null;
    }
}

export function playerBuilder(p: any): Player {
    return new Player(p.num, p.quintet, p.jersey, p.player, p.pos, p.ht, p.wt, p.birthdate, p.nat, p.exp, p.college);
}

export function playersMapper(players: any): Player[] {
    return players.map(playerBuilder).sort((p1: Player,p2: Player) => p1.num - p2.num);
}
