# Independently configurable project photo sizes

## What will change
- Add per-project sizing settings for each page’s main photo and supporting photo.
- Add an optional display-width setting to every additional engineering image, so each one can be sized independently.
- Keep original image proportions and cap widths at the available page width on smaller screens.

## Implementation
- Store simple percentage widths beside each project and each detailed image in the project data.
- Update the project-page image wrappers to read those values instead of using shared fixed widths.
- Preserve the current layout and existing sizes as defaults, then verify all four project pages render correctly.
