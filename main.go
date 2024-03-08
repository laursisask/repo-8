package main

import (
    "syscall/js"
)

func add(this js.Value, args []js.Value) any {
    return "hi"
}


func main() {
      wait := make(chan struct{})

      // Wrap our Go function as JS function to make it callable.
      jsFunc := js.FuncOf(add)

      // Assign our function to window.greeter
      js.Global().Set("add", jsFunc)

      // Prevent the program from exit
      <-wait
}