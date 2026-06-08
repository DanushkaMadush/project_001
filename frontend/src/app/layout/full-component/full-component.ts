import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-full-component',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './full-component.html',
  styleUrl: './full-component.scss',
})
export class FullComponent {}
