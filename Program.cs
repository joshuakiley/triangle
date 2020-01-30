using System;

namespace triangle
{
    class Program
    {
        static void Main(string[] args)
        {
            string data = System.IO.File.ReadAllText("..\\data\\sample.txt");
            Console.WriteLine(data);

        }
    }
}
