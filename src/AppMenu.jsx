import React, { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';

const AppSubmenu = (props) => {

  const [activeIndex, setActiveIndex] = useState(null);

  // 전체 열기 / 닫기
  useEffect(() => {
    if (props.expandAll) {
      setActiveIndex('ALL');
    } else {
      setActiveIndex(null);
    }
  }, [props.expandAll]);


  const onMenuItemClick = (event, item, index) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.items) {
      event.preventDefault();
      setActiveIndex((prev) => (prev === index ? null : index));
    } else {
      setActiveIndex(null);
    }

    props.onMenuItemClick?.({ originalEvent: event, item });
  };

  const onKeyDown = (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      event.target.click();
    }
  };

  const renderLinkContent = (item, active) => {
    const submenuIcon = item.items && (
      <i
        className={classNames(
          'pi pi-chevron-down menuitem-toggle-icon rotate-icon',
          { rotated: active }
        )}
      ></i>
    );
    const badge = item.badge && <Badge value={item.badge} />;

    return (
      <>
        {item.icon && <i className={item.icon}></i>}
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
        <Ripple />
      </>
    );
  };

  const renderLink = (item, i, active) => {
    const content = renderLinkContent(item, active);

    if (item.to) {
      return (
        <NavLink
          className={({ isActive }) =>
            classNames('p-ripple', { 'router-link-active': isActive })
          }
          aria-label={item.label}
          onKeyDown={onKeyDown}
          to={item.to}
          onClick={(e) => onMenuItemClick(e, item, i)}
          target={item.target}
        >
          {content}
        </NavLink>
      );
    } else {
      return (
        <a
          tabIndex="0"
          aria-label={item.label}
          onKeyDown={onKeyDown}
          href={item.url || '#'}
          className="p-ripple"
          onClick={(e) => onMenuItemClick(e, item, i)}
          target={item.target}
        >
          {content}
        </a>
      );
    }
  };

  const items =
    props.items &&
    props.items.map((item, i) => {
      //const active = activeIndex === i;
      const active = activeIndex === 'ALL' || activeIndex === i;
      const styleClass = classNames(item.badgeStyleClass, {
        'layout-menuitem-category': props.root,
        'active-menuitem': active,
      });

      if (props.root) {
        return (
          <li className={styleClass} key={i} role="none">
            <div
              className="layout-menuitem-root-text"
              aria-label={item.label}
              onClick={(e) => onMenuItemClick(e, item, i)}
            >
              {item.label}
              {item.items && (
                <i
                  className={classNames(
                    'pi pi-chevron-down rotate-icon',
                    { rotated: active }
                  )}
                ></i>
              )}
            </div>

            <CSSTransition
              in={active}
              timeout={300}
              classNames="layout-submenu-wrapper"
              unmountOnExit
            >
              <AppSubmenu
                items={item.items}
                onMenuItemClick={props.onMenuItemClick}
                expandAll={props.expandAll}
              />
            </CSSTransition>
          </li>
        );
      } else {
        return (
          <li className={styleClass} key={i} role="none">
            {renderLink(item, i, active)}
            <CSSTransition
              in={active}
              timeout={300}
              classNames="layout-submenu-wrapper"
              unmountOnExit
            >
              <AppSubmenu
                items={item.items}
                onMenuItemClick={props.onMenuItemClick}
              />
            </CSSTransition>
          </li>
        );
      }
    });

  return items ? (
    <ul className={props.className} role="menu">
      {items}
    </ul>
  ) : null;
};

export const AppMenu = (props) => {
    const [expandAll, setExpandAll] = useState(false)



  return (
    <div className="layout-menu-container panel-style">
      <div className='flex items-cente mb-2 justify-between mt-1'>
        <h1>건자재 바코드 시스템</h1>
        <div className='flex gap-4 items-center justify-center'>
           <Tag
            severity="contrast"
            value={expandAll ? '메뉴전체닫기' : '메뉴전체열기'}
            className="cursor-pointer"
           onClick={() => setExpandAll(prev => !prev)}
          />
        </div>       
      </div>
      <AppSubmenu
        items={props.model}
        className="layout-menu"
        onMenuItemClick={props.onMenuItemClick}
        root={true}
        expandAll={expandAll}
      />
    </div>
  );
};
