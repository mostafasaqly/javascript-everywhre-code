interface GreetingProps
{
    name: string;
}

export function Greeting({name}: GreetingProps)
{
    //name = "Ahmed";
    return <h1>Hello, Greeting! {name}</h1>;
}