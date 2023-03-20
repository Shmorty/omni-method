//
//  NoBounce.m
//  App
//
//  Created by Paul Martel on 3/19/23.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@implementation UIScrollView (NoBounce)

- (void)didMoveToWindow {
    [super didMoveToWindow];
    self.bounces = NO;
}

@end
