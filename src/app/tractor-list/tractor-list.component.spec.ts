// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { TractorListComponent } from './tractor-list.component';
import { TractorService } from '../shared/tractor.service';

describe('Tractor List Component', () => {
  const html = '<my-tractor-list></my-tractor-list>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TractorListComponent, TestComponent], providers: [TractorService]});
    TestBed.overrideComponent(TestComponent, {set: {template: html}});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Seznam traktorů');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent {
}
