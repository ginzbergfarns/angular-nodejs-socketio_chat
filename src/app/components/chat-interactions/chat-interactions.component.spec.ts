import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInteractionsComponent } from './chat-interactions.component';

describe('ChatInteractionsComponent', () => {
  let component: ChatInteractionsComponent;
  let fixture: ComponentFixture<ChatInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
