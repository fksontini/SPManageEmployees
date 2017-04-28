export class Employees {

    public id: number;
    public Name: string;
    public Surname: string;
    public Age: number;

    constructor();
    constructor(Name: string, Surname: string, Age: number, id?: number) {

        this.id = id;
        this.Name = Name;
        this.Surname = Surname;
        this.Age = Age;

    }

    public static fromJson(json: any) {
        return new Employees(json.Name, json.Surname, json.Age, json.ID);
    }

    public static fromJsonList(json: any) {
        var list = [];
        for (var i = 0; i < json.length; i++)
            list.push(Employees.fromJson(json[i]));

        return list;
    }
}