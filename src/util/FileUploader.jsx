// src/components/common/FileUploader.jsx
/* eslint-disable */
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';

const FileUploader = forwardRef(
  (
    {
      value = [], // 화면에서 관리하는 파일 배열
      onChange, // 파일 배열 변경
      accept = '*', // 화면별 확장자 제한
      maxSize = 10_000_000, // 전체 용량 한도
      className,
    },
    ref
  ) => {
    const toast = useRef(null);
    const fu = useRef(null);

    const totalSize = value.reduce((s, f) => s + (f.size || 0), 0);
    const fileId = (f) => `${f.name}|${f.size}|${f.lastModified ?? ''}`;
    useImperativeHandle(ref, () => ({
      getFiles: () => value,
      clear: () => {
        fu.current?.clear();
        onChange?.([]);
      },
      removeAt: (i) => {
        const f = value[i];
        if (!f) return;
        removeById(fileId(f));
      },
    }));

    const isAccepted = (file, accept) => {
      if (!accept || accept === '*') return true;
      const list = accept
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const name = (file.name || '').toLowerCase();
      const type = (file.type || '').toLowerCase();
      return list.some((rule) => {
        if (rule.endsWith('/*'))
          return type.startsWith(rule.slice(0, -2) + '/');
        if (rule.startsWith('.')) return name.endsWith(rule);
        return type === rule;
      });
    };

    const handleDropCapture = (e) => {
      const files = Array.from(e.dataTransfer?.files || []);
      const invalid = files.filter((f) => !isAccepted(f, accept));
      if (invalid.length) {
        e.preventDefault();
        e.stopPropagation();
        toast.current.show({
          severity: 'warn',
          summary: '허용되지 않은 형식',
          detail: `${invalid.length}개 파일이 차단됨`,
          life: 2000,
        });
      }
    };

    const parseAccept = (accept) =>
      String(accept || '*')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    const matchAccept = (file, rules) => {
      if (!rules.length || rules.includes('*')) return true;
      const name = file.name?.toLowerCase() || '';
      const type = file.type || '';
      const ext = name.slice(name.lastIndexOf('.'));

      return rules.some((rule) => {
        if (rule === '*') return true;
        if (rule.endsWith('/*')) {
          const major = rule.slice(0, -2);
          return type.startsWith(major + '/');
        }
        if (rule.startsWith('.')) {
          return ext === rule.toLowerCase();
        }
        return type === rule;
      });
    };

    const onSelect = (e) => {
      const rules = parseAccept(accept);
      const accepted = [];
      const rejected = [];

      const existing = new Set(value.map(fileId));

      for (const file of e.files) {
        if (!matchAccept(file, rules)) {
          rejected.push(file);
          continue;
        }
        const id = fileId(file);
        if (!existing.has(id)) {
          existing.add(id);
          accepted.push(file);
        }
      }

      if (accepted.length) onChange?.([...value, ...accepted]);

      if (rejected.length) {
        toast.current?.show({
          severity: 'warn',
          summary: '허용되지 않는 파일',
          detail: rejected.map((f) => f.name).join(', '),
          life: 2500,
        });
      }
    };

    const removeById = (id) => {
      const next = value.filter((item) => fileId(item) !== id);
      onChange?.(next);
    };

    const onRemove = (file, callback) => {
      removeById(fileId(file));
      callback();
    };

    const onClear = () => onChange?.([]);

    // 미리보기
    const itemTemplate = (file, props) => {
      if (!isAccepted(file, accept)) {
        requestAnimationFrame(() => props.onRemove());
        return null;
      }
      return (
        <div className="flex align-items-center justify-content-between w-full">
          <div className="flex align-items-center gap-3">
            {file.type?.startsWith('image/') ? (
              <img
                src={file.objectURL}
                alt={file.name}
                width={80}
                height={80}
                style={{
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid var(--surface-d)',
                }}
              />
            ) : (
              <i className="pi pi-file text-3xl" />
            )}
            <div className="flex flex-column">
              <span className="font-medium">{file.name}</span>
              <small className="text-color-secondary">{props.formatSize}</small>
            </div>
          </div>
          <Button
            icon="pi pi-times"
            className="p-button-text p-button-danger"
            onClick={() => onRemove(file, props.onRemove)}
          />
        </div>
      );
    };

    // 헤더 아이콘
    const headerTemplate = ({
      className,
      chooseButton,
      /* uploadButton, */ cancelButton,
    }) => {
      const percent = Math.min(100, (totalSize / maxSize) * 100);
      const fmt = fu.current?.formatSize(totalSize) ?? '0 B';
      const maxFmt = fu.current?.formatSize(maxSize);
      return (
        <div
          className={className}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
          }}
        >
          {chooseButton}
          {cancelButton}
          <div className="flex align-items-center gap-2 ml-auto">
            <span>
              {fmt} / {maxFmt}
            </span>
            <ProgressBar
              value={percent}
              showValue={false}
              style={{ width: '8rem', height: 10 }}
            />
          </div>
        </div>
      );
    };

    const emptyTemplate = () => (
      <div className="flex flex-column align-items-center justify-content-center py-5">
        <i
          className="pi pi-cloud-upload text-6xl mb-3"
          style={{ color: 'var(--text-color-secondary)' }}
        />
        <span className="text-lg text-color-secondary">
          여기에 파일을 드롭하거나 상단 아이콘으로 선택하세요
        </span>
      </div>
    );

    const chooseOptions = {
      icon: 'pi pi-fw pi-upload',
      iconOnly: true,
      className: 'p-button-rounded p-button-outlined',
    };
    const cancelOptions = {
      icon: 'pi pi-fw pi-times',
      iconOnly: true,
      className: 'p-button-danger p-button-rounded p-button-outlined',
    };

    return (
      <div
        className={className}
        onDropCapture={handleDropCapture}
        onDragOverCapture={(e) => e.dataTransfer && e.preventDefault()}
      >
        <Toast ref={toast} />
        <FileUpload
          ref={fu}
          name="files[]"
          multiple
          accept={accept}
          maxFileSize={maxSize}
          onSelect={onSelect}
          onClear={onClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          cancelOptions={cancelOptions}
          customUpload={false}
          auto={false}
        />
      </div>
    );
  }
);

export default FileUploader;
