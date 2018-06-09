import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MenuItem } from '../menu-item';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  id: string;

  appetizers$: Observable<MenuItem[]>;
  mainCourses$: Observable<MenuItem[]>;
  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.appetizers$ = this.menuService.getAppetizers();
    this.mainCourses$ = this.menuService.getMainCourses();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
