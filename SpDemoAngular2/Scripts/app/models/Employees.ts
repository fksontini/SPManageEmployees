export class Employees {

    public id: number;
    public name: string;
    public Surname: string;
    public age: number;

    constructor();
    constructor(name: string, Surname: string, age: number, id?: number) {

        this.id = id;
        this.name = name;
        this.Surname = Surname;
        this.age = age;

    }

    public static fromJson(json: any) {
        return new Employees(json.name, json.surname, json.age, json.ID);
    }

    public static fromJsonList(json: any) {
        var list = [];
        for (var i = 0; i < json.length; i++)
            list.push(Employees.fromJson(json[i]));

        return list;
    }
}