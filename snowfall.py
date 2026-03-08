import pygame
import random

pygame.init()

screen = pygame.display.set_mode((600, 600))

snow = [[random.randrange(600), random.randrange(600)] for _ in range(50)]

clock = pygame.time.Clock()

while True:
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            pygame.quit()
            exit()

    screen.fill((0, 0, 0))

    for s in snow:
        pygame.draw.circle(screen, (255, 255, 255), s, 10)
        s[1] += 1

        if s[1] > 600:
            s[1] = random.randrange(-20, 0)
            s[0] = random.randrange(600)

    pygame.display.flip()
    clock.tick(60)
