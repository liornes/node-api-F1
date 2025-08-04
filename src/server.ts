import { fastify } from 'fastify';
import cors from '@fastify/cors';

const server = fastify({logger: true});

server.register(cors, {
    origin: "*"
});

const teams = [
    {id: 1, name: "McLaren", base: "Woking, United Kingdom"},
    {id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
    {id: 4, name: "Ferrari", base: "Maranello, Italy"},
    {id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom"},
    {id: 6, name: "Alpine", base: "Enstone, United Kingdom"},
    {id: 7, name: "Williams", base: "Grove, United Kingdom"},
    {id: 8, name: "RB", base: "Faenza, Italy"},
    {id: 9, name: "Sauber", base: "Hinwil, Switzerland"},
    {id: 10, name: "Haas", base: "Kannapolis, United States"}
];

const drivers = [
    {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 2, name: "Sergio Pérez", team: "Red Bull Racing"},
    {id: 3, name: "Charles Leclerc", team: "Ferrari"},
    {id: 4, name: "Lewis Hamilton", team: "Ferrari"},
    {id: 5, name: "Lando Norris", team: "McLaren"},
    {id: 6, name: "Oscar Piastri", team: "McLaren"},
    {id: 7, name: "George Russell", team: "Mercedes"},
    {id: 8, name: "Andrea Kimi Antonelli", team: "Mercedes"},
    {id: 9, name: "Fernando Alonso", team: "Aston Martin"},
    {id: 10, name: "Lance Stroll", team: "Aston Martin"},
    {id: 11, name: "Pierre Gasly", team: "Alpine"},
    {id: 12, name: "Jack Doohan", team: "Alpine"},
    {id: 13, name: "Alex Albon", team: "Williams"},
    {id: 14, name: "Carlos Sainz", team: "Williams"},
    {id: 15, name: "Yuki Tsunoda", team: "RB"},
    {id: 16, name: "Isack Hadjar", team: "RB"},
    {id: 17, name: "Nico Hülkenberg", team: "Sauber"},
    {id: 18, name: "Gabriel Bortoleto", team: "Sauber"},
    {id: 19, name: "Kevin Magnussen", team: "Haas"},
    {id: 20, name: "Oliver Bearman", team: "Haas"}
];

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200);

    return { teams };
});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);

    return { drivers };
});

interface RouteParams {
    id: string
}

server.get<{Params: RouteParams}>("/drivers/:id", async(request, response) => {
    const id = parseInt(request.params.id);

    const driver = drivers.find((d) => d.id === id);

    if(!driver) {
        response.type("application/json").code(404);
        return {message: "Driver not found"}
    }else {
        response.type("application/json").code(200);
        return { driver };
    }
});

server.get<{Params: RouteParams}>("/teams/:id", async(request, response) => {
    const id = parseInt(request.params.id);

    const team = teams.find((t) => t.id === id);

    if(!team) {
        response.type("application/json").code(404);
        return {message: "Driver not found"}
    }else {
        response.type("application/json").code(200);
        return { team };
    }
});

server.listen({port: 3333}, () => console.log("Server Init"));